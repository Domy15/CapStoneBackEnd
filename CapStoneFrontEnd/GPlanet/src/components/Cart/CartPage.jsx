/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CartGameCard from "./CartGameCard";

const CartPage = () => {
    const { userName } = useParams();
    const dispatch = useDispatch();
    const update = useSelector(state => state.update);
    const [cart, setCart] = useState([]);
    const [sum, setSum] = useState(0);

    const handleClick = async (e) => {
        e.preventDefault();
        const gameIds = cart.map(game => game.id);
        addToLibrary(gameIds);
    }

    const addToLibrary = async (gameIds) => {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await fetch(`https://localhost:7227/api/Library/${userName}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token.token}`
                },
                body: JSON.stringify(gameIds)
            });

            if (response.ok) {
                const wishList = await getWishList();
                const removalPromises = cart
                    .filter(game => wishList.some(g => g.id === game.id))
                    .map(game => removeFromWishList(game));

                await Promise.all(removalPromises);

                await emptyCart();
            } else {
                throw new Error("Errore durante l'acquisto!");
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    const getWishList = async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await fetch(`https://localhost:7227/api/WishList/${userName}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token.token}`,
                }
            });
            if (response.ok) {
                const data = await response.json();
                return data.wishList;
            } else {
                throw new Error("Errore durante il recupero della lista desideri!");
            }
        }
        catch (error) {
            console.log(error);
            return [];
        }
    };

    const removeFromWishList = async (game) => {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await fetch(`https://localhost:7227/api/WishList/${userName}/${game.id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token.token}`,
                }
            });
            if (response.ok) {
                console.log("Giochi rimossi dalla wishList!")
            } else {
                throw new Error("Errore durante la rimozione dalla lista desideri!");
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    const getCart = async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await fetch(`https://localhost:7227/api/Cart/${userName}`, {
                headers: {
                    "Authorization": `Bearer ${token.token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                const total = data.cart.reduce((acc, item) => acc + item.price, 0);
                setCart(data.cart);
                setSum(total);
            } else {
                throw new Error("Errore nel recupero dei dati dal carrello!");
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    const emptyCart = async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await fetch(`https://localhost:7227/api/Cart/${userName}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token.token}`
                }
            });
            if (response.ok) {
                dispatch({
                    type: "UPDATE",
                });
            } else {
                throw new Error("Errore nell'eliminazione dei dati!");
            }
        }
        catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        if (userName) {
            getCart();
        }
    }, [update]);
    return (
        <Container className="mt-4">
            <h1 className="text-white h2">Il tuo carrello</h1>
            {cart.length > 0 ?
                (
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
                                <p className="text-secondary">L'imposta sulle vendite verrà calcolata al momento del pagamento, ove applicabile.</p>
                                <button variant="success" className="w-100 custom-button" onClick={handleClick}>Procedi al pagamento</button>
                            </div>
                        </Col>
                    </Row>)
                : (<p className="text-white mt-3">Nessun gioco aggiunto al carrello.</p>)}
        </Container>
    );
}

export default CartPage;