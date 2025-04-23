import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { removeFromCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const CartGameCard = ({ game }) => {
    const { userName } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRemoveFromCart = async () => {
        try {
            await removeFromCart(userName, game);
            dispatch({
                type: "UPDATE",
            });
            toast.info("Gioco rimosso dal carrello!");
        }
        catch (error) {
            console.log(error);
            toast.error("Errore durante la rimozione dal carrello!");
        }
    }

    return (
        <div className="d-flex flex-column flex-md-row bg-dark text-white p-3 rounded shadow-sm game-card my-3">
            <img
                onClick={() => navigate(`/game/${game.id}`)}
                src={game.coverLarge.startsWith("http") ? game.coverLarge : `https://localhost:7227/${game.coverLarge}`}
                alt={game.title}
                className="me-md-3 mb-3 mb-md-0 align-self-center"
                style={{
                    width: "100%",
                    maxWidth: "15em",
                    height: "auto",
                    borderRadius: "5px",
                    cursor: "pointer"
                }}
            />
            <div className="w-100">
                <h2 className="fs-3" style={{ cursor: "pointer" }} onClick={() => navigate(`/game/${game.id}`)}>{game.title}</h2>
                <div className="text-end">
                    <p className='m-0'>{game.price > 0 ? `${game.price}€` : "Free-to-Play"}</p>
                    <small className="text-secondary">
                        <span role="button" className="text-decoration-underline" onClick={handleRemoveFromCart}>rimuovi</span>
                    </small>
                </div>
            </div>
        </div>
    );
}

export default CartGameCard;