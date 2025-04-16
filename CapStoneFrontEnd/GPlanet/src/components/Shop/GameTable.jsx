import { useState } from "react";
import { Image, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const GameTable = ({ games }) => {
    const [show, setShow] = useState(30);
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("it-IT", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    };

    return (
        <Table responsive hover variant="dark" className="mt-4">
            <tbody>
                {games.slice(0, show).map((game, index) => (
                    <tr key={index} style={{ verticalAlign: "middle", cursor: "pointer" }} onClick={() => navigate(`/game/${game.id}`)}>
                        <td>
                            <Image src={game.coverLarge.startsWith('http') ? game.coverLarge : `https://localhost:7227/${game.coverLarge}`} rounded style={{ width: 80, height: 40 }} />
                        </td>
                        <td>{game.title}</td>
                        <td>{formatDate(game.releaseDate)}</td>
                        <td>{game.price > 0 ? `${game.price}€` : "Free-to-Play"}</td>
                    </tr>
                ))}
            </tbody>
            {games.length > show && <button variant={"success"} className="mt-3 custom-button" onClick={() => setShow(show + 30)}>Mostra altro</button>}
        </Table>
    );
}

export default GameTable;