/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist, removeFromWishlist } from '../../redux/actions/wishlist';
import { addToCart, fetchCart } from '../../redux/actions/cart';
import { addToLibrary, fetchLibrary } from '../../redux/actions/library';

const PurchaseBox = ({ game }) => {
    const update = useSelector(state => state.update);
    const userName = useSelector(state => state.profile.userName);
    const dispatch = useDispatch();
    const [isThereCart, setIsThereCart] = useState(false);
    const [isThereLibrary, setIsThereLibrary] = useState(false);
    const [isThere, setIsThere] = useState(false);

    const loadWishlist = async () => {
        try {
            const data = await fetchWishlist(userName);
            setIsThere(data.some(g => g.id === game.id));
        } catch (error) {
            console.error(error);
        }
    };

    const loadCart = async () => {
        try {
            const data = await fetchCart(userName);
            setIsThereCart(data.cart.some(g => g.id === game.id));
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddToCart = async () => {
        try {
            await addToCart(userName, game.id);
            dispatch({ type: "UPDATE" });
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

    const handleAddToLibrary = async () => {
        try {
            await addToLibrary(userName, [game.id]);
            if (isThere) {
                handleRemoveFromWishlist();
            } else {
                dispatch({
                    type: "UPDATE",
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleRemoveFromWishlist = async () => {
        try {
            await removeFromWishlist(userName, game.id);
            dispatch({ type: "UPDATE" });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (userName && game?.id) {
            setIsThere(false);
            setIsThereCart(false);
            setIsThereLibrary(false);
            loadWishlist();
            loadCart();
            checkLibrary();
        }
    }, [update, game?.id])
    return (
        <div className='d-flex justify-content-between align-items-center mt-5 p-4' style={{ backgroundColor: "#4C5B69" }}>
            <h3 className='text-white'>{game.title}</h3>

            <div className='bg-black d-flex align-items-center p-1 ps-2' style={{ gap: "8px" }}>
                <p className='text-white m-0'>{game.price > 0 ? `${game.price}€` : "Free-to-Play"}</p>

                {game.price === 0 && !isThereLibrary ? (
                    <Button variant={"success"} onClick={handleAddToLibrary}>
                        Aggiungi alla libreria
                    </Button>
                ) : isThereLibrary ? (
                    <Button variant={"success"} disabled>
                        Presente in Libreria
                    </Button>
                ) : isThereCart ? (
                    <Button variant={"success"} disabled>
                        Nel Carrello
                    </Button>
                ) : (
                    <Button variant={"success"} onClick={handleAddToCart}>
                        Aggiungi al carrello
                    </Button>
                )}

            </div>
        </div>
    );
};

export default PurchaseBox;