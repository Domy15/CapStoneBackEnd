/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CartGameCard from "./CartGameCard";
import { addToLibrary } from "../../redux/actions/library";
import { fetchWishlist, removeFromWishlist } from "../../redux/actions/wishlist";
import { clearCart, fetchCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const CartPage = () => {
    const { userName } = useParams();
    const dispatch = useDispatch();
    const update = useSelector(state => state.update);
    const [cart, setCart] = useState([]);
    const [sum, setSum] = useState(0);

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const gameIds = cart.map(game => game.id);
            await addToLibrary(userName, gameIds);
            const wishlist = await fetchWishlist(userName);
            const removalPromises = cart
                .filter(game => wishlist.some(w => w.id === game.id))
                .map(game => removeFromWishlist(userName, game.id));
            await Promise.all(removalPromises);
            await clearCart(userName);
            dispatch({ type: "UPDATE" });
            const message = cart.length > 1 ? "Giochi aggunti" : "Gioco aggiunto";
            toast.success(`${message} alla libreria!`);
        } catch (error) {
            console.error(error);
            const messageError = cart.length > 1 ? "dei giochi" : "del gioco";
            toast.error(`Errore durante l'acquisto ${messageError}`);
        }
    };

    const loadCart = async () => {
        try {
            const data = await fetchCart(userName);
            const total = data.cart.reduce((acc, item) => acc + item.price, 0);
            setCart(data.cart);
            setSum(total);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (userName) loadCart();
    }, [update]);

    return (
        <Container className="mt-4">
            <h1 className="text-white h2">Il tuo carrello</h1>
            {cart.length > 0 ? (
                <Row>
                    <Col xs={12} xl={9}>
                        {cart.map((game, i) => (
                            <CartGameCard key={i} game={game} />
                        ))}
                    </Col>
                    <Col>
                        <div className="bg-dark p-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="text-white">Totale stimato</p>
                                <p className="text-white fs-5 fw-bold">{sum}€</p>
                            </div>
                            <p className="text-secondary">
                                L'imposta sulle vendite verrà calcolata al momento del pagamento, ove applicabile.
                            </p>
                            <button
                                variant="success"
                                className="w-100 custom-button"
                                onClick={handleClick}
                            >
                                Procedi al pagamento
                            </button>
                        </div>
                    </Col>
                </Row>
            ) : (
                <p className="text-white mt-3">Nessun gioco aggiunto al carrello.</p>
            )}
        </Container>
    );
};

export default CartPage;
