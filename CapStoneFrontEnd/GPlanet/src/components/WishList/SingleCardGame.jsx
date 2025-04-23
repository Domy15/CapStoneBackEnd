/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Badge, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart, fetchCart } from "../../redux/actions/cart";
import { addToLibrary, fetchLibrary } from "../../redux/actions/library";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { toast } from "react-toastify";

const SingleCardGame = ({ game }) => {
    const update = useSelector(state => state.update);
    const { userName } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isThereCart, setIsThereCart] = useState(false);
    const [isThereLibrary, setIsThereLibrary] = useState(false);

    const checkCart = async () => {
        try {
            const data = await fetchCart(userName);
            setIsThereCart(data.cart.some(g => g.id === game.id));
        } catch (error) {
            console.error(error);
        }
    };

    const checkLibrary = async () => {
        try {
            const data = await fetchLibrary(userName);
            setIsThereLibrary(data.library.some(g => g.id === game.id));
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddToCart = async () => {
        try {
            await addToCart(userName, game.id);
            dispatch({ type: "UPDATE" });
            toast.success("Gioco aggiunto al carrello!");
        } catch (error) {
            console.error(error);
            toast.error("Errore durante l'aggiunta al carrello!");
        }
    };

    const handleAddToLibrary = async () => {
        try {
            await addToLibrary(userName, [game.id]);
            dispatch({ type: "UPDATE" });
            toast.success("Gioco aggiunto alla libreria!");
        } catch (error) {
            console.error(error);
            toast.error("Errore durante l'aggiunta alla libreria!");
        }
    };

    const handleRemoveFromWishlist = async () => {
        try {
            await removeFromWishlist(userName, game.id);
            dispatch({ type: "UPDATE" });
            toast.info("Gioco rimosso dalla lista desideri!");
        } catch (error) {
            console.error(error);
            toast.error("Errore durante la rimozione dalla lista desideri!");
        }
    };

    useEffect(() => {
        if (userName) {
            checkCart();
            checkLibrary();
        }
    }, [update]);

    return (
        <div className="d-flex flex-column flex-md-row bg-dark text-white p-3 rounded shadow-sm game-card my-3">
            <img
                onClick={() => navigate(`/game/${game.id}`)}
                src={game.coverLarge.startsWith("http") ? game.coverLarge : `https://localhost:7227/${game.coverLarge}`}
                alt={game.title}
                className="me-md-3 mb-3 mb-md-0 align-self-center"
                style={{ width: "100%", maxWidth: "25em", height: "auto", borderRadius: "5px", cursor: "pointer" }}
            />
            <div className="w-100">
                <h2 className="fs-md-2" style={{ cursor: "pointer" }} onClick={() => navigate(`/game/${game.id}`)}>
                    {game.title}
                </h2>

                <div className="d-flex flex-column flex-md-row justify-content-between mt-3 mt-md-5 gap-4">
                    <div>
                        <div className="mb-4">
                            <div className="small">SVILUPPATORE: <span className="text-info fw-bold">{game.company}</span></div>
                            <div className="small">DATA DI RILASCIO: <span>{game.releaseDate}</span></div>
                        </div>

                        <div className="d-flex flex-wrap gap-2 mb-3">
                            {game.categories.map((tag, i) => (
                                <Badge bg="secondary" key={i} className="text-wrap">{tag.name}</Badge>
                            ))}
                        </div>
                    </div>

                    <div className="d-flex flex-column align-items-start">
                        <div className="bg-black d-flex flex-wrap align-items-center gap-2 p-1 mb-3">
                            <p className="m-0">{game.price > 0 ? `${game.price}€` : "Free-to-Play"}</p>
                            {game.price === 0 && !isThereLibrary ? (
                                <Button variant="success" onClick={handleAddToLibrary}>Aggiungi alla libreria</Button>
                            ) : isThereLibrary ? (
                                <Button variant="success" disabled>Presente in Libreria</Button>
                            ) : isThereCart ? (
                                <Button variant="success" disabled>Nel Carrello</Button>
                            ) : (
                                <Button variant="success" onClick={handleAddToCart}>Aggiungi al carrello</Button>
                            )}
                        </div>
                        <small className="text-secondary">
                            Rimuovi dalla lista desideri (<span role="button" className="text-decoration-underline" onClick={handleRemoveFromWishlist}>rimuovi</span>)
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleCardGame;