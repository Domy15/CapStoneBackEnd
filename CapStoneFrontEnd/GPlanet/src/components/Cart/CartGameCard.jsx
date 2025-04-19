import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const CartGameCard = ({ game }) => {
    const { userName } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const removeFromCart = async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await fetch(`https://localhost:7227/api/Cart/${userName}/${game.id}`, {
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
                throw new Error("Errore nella rimozione dei dati dal carrello!")
            }
        }
        catch (error) {
            console.log(error);
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
                        <span role="button" className="text-decoration-underline" onClick={removeFromCart}>rimuovi</span>
                    </small>
                </div>
            </div>
        </div>
    );
}

export default CartGameCard;