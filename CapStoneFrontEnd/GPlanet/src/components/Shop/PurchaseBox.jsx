/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

const PurchaseBox = ({ game }) => {
    const update = useSelector(state => state.update);
    const userName = useSelector(state => state.profile.userName);
    const dispatch = useDispatch();
    const [isThere, setIsThere] = useState(false);

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
                setIsThere(data.cart.some(g => g.id === game.id));
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

    useEffect(() => {
        getCart();
    }, [update])
    return (
        <>
            {!isThere ?
                <div className='d-flex justify-content-between align-items-center mt-5 p-4' style={{ backgroundColor: "#4C5B69" }}>
                    <h3 className='text-white'>{game.title}</h3>

                    <div className='bg-black d-flex align-items-center p-1 ps-2' style={{ gap: "8px" }}>
                        <p className='text-white m-0'>{game.price > 0 ? `${game.price}€` : "Free-to-Play"}</p>
                        <Button variant={"success"} onClick={addToCart}>
                            Aggiungi al carrello
                        </Button>
                    </div>
                </div> :
                <div className='d-flex justify-content-between align-items-center mt-5 p-4' style={{ backgroundColor: "#4C5B69" }}>
                    <h3 className='text-white'>{game.title}</h3>

                    <div className='bg-black d-flex align-items-center p-1 ps-2' style={{ gap: "8px" }}>
                        <p className='text-white m-0'>{game.price > 0 ? `${game.price}€` : "Free-to-Play"}</p>
                        <Button variant={"success"} disabled>
                            Nel Carrello
                        </Button>
                    </div>
                </div>}
        </>
    );
};

export default PurchaseBox;