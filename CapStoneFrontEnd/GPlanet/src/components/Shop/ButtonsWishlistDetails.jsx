/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { CheckSquare } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToWishList, fetchWishlist, removeFromWishlist } from "../../redux/actions/wishlist";
import { toast } from "react-toastify";

const ButtonsWishlistDetails = () => {
    const update = useSelector(state => state.update);
    const userName = useSelector(state => state.profile.userName);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isThere, setIsThere] = useState(false);

    const getWishlistStatus = async () => {
        try {
            const wishList = await fetchWishlist(userName);
            setIsThere(wishList.some(game => game.id === id));
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddToWishList = async () => {
        try {
            await addToWishList(userName, id);
            dispatch({
                type: "UPDATE",
            });
            toast.success("Gioco aggiunto alla lista desideri!");
        } catch (error) {
            console.log(error);
            toast.error("Errore durante l'aggiunta del gioco dalla lista desideri!");
        }
    };

    const handleRemoveFromWishList = async () => {
        try {
            await removeFromWishlist(userName, id);
            dispatch({
                type: "UPDATE",
            });
            toast.info("Gioco rimosso alla lista desideri!");
        } catch (error) {
            console.log(error);
            toast.error("Errore durante la rimozione del gioco dalla lista desideri!");
        }
    };

    useEffect(() => {
        if (userName) {
            getWishlistStatus();
        }
    }, [userName, update]);

    return (
        <>
            {userName && (
                !isThere ? (
                    <Button className="custom-button-whishlist mt-2" onClick={handleAddToWishList}>
                        Aggiungi alla lista desideri
                    </Button>
                ) : (
                    <div className="d-flex">
                        <Button className="custom-button-whishlist mt-2 d-flex" onClick={handleRemoveFromWishList}>
                            <CheckSquare className="fs-5 me-1" /> Nella lista desideri
                        </Button>
                        <Dropdown className="mt-2 ms-1" align="end">
                            <Dropdown.Toggle split className="custom-button-whishlist" id="dropdown-split-basic" />
                            <Dropdown.Menu className="bg-dark">
                                <Dropdown.Item className="text-white" onClick={handleRemoveFromWishList}>
                                    Rimuovi dalla lista desideri
                                </Dropdown.Item>
                                <Dropdown.Item className="text-white" onClick={() => navigate(`/wishList/${userName}`)}>
                                    Gestisci lista desideri
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                )
            )}
        </>
    );
};

export default ButtonsWishlistDetails;