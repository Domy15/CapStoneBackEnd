/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Badge, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const SingleCardGame = ({ game }) => {
    const update = useSelector(state => state.update);
    const { userName } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isThereCart, setIsThereCart] = useState(false);
    const [isThereLibrary, setIsThereLibrary] = useState(false);

    const getCart = async () => {
        const getToken = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await fetch(`https://localhost:7227/api/Cart/${userName}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${getToken.token}`,
                }
            });
            if (response.ok) {
                const data = await response.json();
                setIsThereCart(data.cart.some(g => g.id === game.id));
            } else {
                throw new Error("Errore nel recupero dei dati!");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const addToCart = async () => {
        const getToken = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await fetch(`https://localhost:7227/api/Cart/${userName}/${game.id}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${getToken.token}`,
                }
            });
            if (response.ok) {
                dispatch({
                    type: "UPDATE",
                });
            } else {
                throw new Error("Errore nell'aggiunta al carrello!")
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const getLibrary = async () => {
        const getToken = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await fetch(`https://localhost:7227/api/Library/${userName}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${getToken.token}`,
                }
            });
            if (response.ok) {
                const data = await response.json();
                setIsThereLibrary(data.library.some(g => g.id === game.id));
            } else {
                throw new Error("Errore nel recupero dei dati!");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const AddToLibrary = async () => {
        const getToken = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await fetch(`https://localhost:7227/api/Library/${userName}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken.token}`
                },
                body: JSON.stringify([game.id])
            });
            if (response.ok) {
                dispatch({
                    type: "UPDATE",
                });
            } else {
                throw new Error("Errore nell'aggiunta alla libreria!")
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const removeFromWishList = async () => {
        const getToken = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await fetch(`https://localhost:7227/api/WishList/${userName}/${game.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken.token}`,
                }
            });
            if (response) {
                dispatch({
                    type: "UPDATE",
                });
            } else {
                throw new Error("Errore nella rimozione del gioco dalla lista desideri!");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (userName) {
            getCart();
            getLibrary();
        }
    }, [update])
    return (
        <div className="d-flex flex-column flex-md-row bg-dark text-white p-3 rounded shadow-sm game-card my-3">
            <img
                onClick={() => navigate(`/game/${game.id}`)}
                src={game.coverLarge.startsWith("http") ? game.coverLarge : `https://localhost:7227/${game.coverLarge}`}
                alt={game.title}
                className="me-md-3 mb-3 mb-md-0 align-self-center"
                style={{
                    width: "100%",
                    maxWidth: "25em",
                    height: "auto",
                    borderRadius: "5px",
                    cursor: "pointer"
                }}
            />
            <div className="w-100">
                <h2 className="fs-md-2" style={{ cursor: "pointer" }} onClick={() => navigate(`/game/${game.id}`)}>{game.title}</h2>

                <div className="d-flex flex-column flex-md-row justify-content-between mt-3 mt-md-5 gap-4">
                    <div>
                        <div className="mb-4">
                            <div className="small">
                                SVILUPPATORE: <span className="text-info fw-bold">{game.company}</span>
                            </div>
                            <div className="small">
                                DATA DI RILASCIO: <span>{game.releaseDate}</span>
                            </div>
                        </div>

                        <div className="d-flex flex-wrap gap-2 mb-3">
                            {game.categories.map((tag, i) => (
                                <Badge bg="secondary" key={i} className="text-wrap">{tag.name}</Badge>
                            ))}
                        </div>
                    </div>

                    <div className="d-flex flex-column align-items-start">
                        <div className='bg-black d-flex flex-wrap align-items-center gap-2 p-1 mb-3'>
                            <p className='m-0'>{game.price > 0 ? `${game.price}€` : "Free-to-Play"}</p>
                            {game.price === 0 && !isThereLibrary ? (
                                <Button variant="success" onClick={AddToLibrary}>
                                    Aggiungi alla libreria
                                </Button>
                            ) : isThereLibrary ? (
                                <Button variant="success" disabled>
                                    Presente in Libreria
                                </Button>
                            ) : isThereCart ? (
                                <Button variant="success" disabled>
                                    Nel Carrello
                                </Button>
                            ) : (
                                <Button variant="success" onClick={addToCart}>
                                    Aggiungi al carrello
                                </Button>
                            )}
                        </div>
                        <small className="text-secondary">
                            Rimuovi dalla lista desideri (<span role="button" className="text-decoration-underline" onClick={removeFromWishList}>rimuovi</span>)
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleCardGame;