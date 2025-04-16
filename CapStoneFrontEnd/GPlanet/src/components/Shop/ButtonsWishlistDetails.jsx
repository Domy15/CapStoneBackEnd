/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { CheckSquare } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ButtonsWishlistDetails = () => {
    const update = useSelector(state => state.update);
    const userName = useSelector(state => state.profile.userName);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isThere, setIsThere] = useState(false);

    const getWishlist = async () => {
        const getToken = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await fetch(`https://localhost:7227/api/WishList/${userName}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${getToken.token}`,
                }
            });
            if (response.ok) {
                const data = await response.json();
                setIsThere(data.wishList.some(game => game.id === id));
            } else {
                throw new Error("Errore nel recupero dei dati!");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const addToWishList = async () => {
        const getToken = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await fetch(`https://localhost:7227/api/WishList/${userName}/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken.token}`,
                }
            });
            if (response.ok) {
                dispatch({
                    type: "UPDATE",
                });
            } else {
                throw new Error("Errore nel aggiunta dei dati!");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const removeFromWishList = async () => {
        const getToken = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await fetch(`https://localhost:7227/api/WishList/${userName}/${id}`, {
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
        getWishlist();
    }, [userName, update])

    return (
        <>
            {userName && (
                !isThere ? (<Button className="custom-button-whishlist mt-4" onClick={addToWishList}>
                    Aggiungi alla lista desideri
                </Button>) :
                    (<div className="d-flex">
                        <Button className="custom-button-whishlist mt-4 d-flex" onClick={removeFromWishList}>
                            <CheckSquare className="fs-5 me-1" /> Nella lista desideri
                        </Button>
                        <Dropdown className="mt-4 ms-1" align="end">
                            <Dropdown.Toggle split className="custom-button-whishlist" id="dropdown-split-basic" />
                            <Dropdown.Menu className="bg-dark">
                                <Dropdown.Item className="text-white" onClick={removeFromWishList}>
                                    Rimuovi dalla lista desideri
                                </Dropdown.Item>
                                <Dropdown.Item className="text-white" onClick={() => navigate(`/wishList/${userName}`)}>
                                    Gestisci lista desideri
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>))
            }
        </>
    );
}

export default ButtonsWishlistDetails;