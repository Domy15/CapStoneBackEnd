import { useNavigate } from "react-router-dom";

const MiniCarouselCard = ({game, index}) => {
    const navigate = useNavigate();

    return (
        <div key={index}>
            <div
                onClick={() => navigate(`/game/${game.id}`)}
                style={{
                    padding: "0.5rem",
                    cursor: "pointer"
                }}
            >
                <img
                    src={game.cover.startsWith('http') ? game.cover : `https://localhost:7227/${game.cover}`}
                    alt={game.title}
                    style={{
                        width: "18em",
                        height: "18em",
                        borderRadius: "1em",
                        objectFit: "cover",
                        marginBottom: "0.5rem",
                    }}
                />
                <p className="text-light mb-1" style={{ fontSize: "0.9rem" }}>{game.title}</p>
                <p className="text-success mb-0" style={{ fontWeight: "bold" }}>{game.price > 0 ? `${game.price}€` : "Free-to-Play"}</p>
            </div>
        </div>
    );
}

export default MiniCarouselCard;