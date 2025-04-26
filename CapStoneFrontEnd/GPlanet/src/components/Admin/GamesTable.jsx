import { Button } from "react-bootstrap";
import { Pencil, Trash } from "react-bootstrap-icons";

const GamesTable = ({ games, sliceNumber }) => {
    return (
        <div className="rounded" style={{ backgroundColor: "#212529" }}>
            <table className="text-white w-100 table table-custom align-middle">
                <thead>
                    <tr>
                        <th>Copertina</th>
                        <th>Titolo</th>
                        <th>Categorie</th>
                        <th>Azienda</th>
                        <th>Prezzo</th>
                        <th>Azioni</th>
                    </tr>
                </thead>
                <tbody>
                    {games.slice(0, sliceNumber).map((game) => (
                        <tr key={game.id}>
                            <td>
                                <img
                                    src={game.cover.startsWith("http") ? game.cover : `https://localhost:7227/${game.cover}`}
                                    alt={game.title}
                                    style={{ width: "3.5em", height: "3.5em", objectFit: "cover", borderRadius: "8px" }}
                                />
                            </td>
                            <td>{game.title}</td>
                            <td>
                                {game.categories && game.categories.length > 0 &&
                                    game.categories.map((category, index) => (
                                        <span key={index} className="badge bg-primary me-1">
                                            {category.name}
                                        </span>))}
                            </td>
                            <td>{game.company}</td>
                            <td>{game.price > 0 ? `${game.price}€` : "Free-to-Play"}</td>
                            <td>
                                <Button className="me-2 button-update"><Pencil className="text-white" /></Button>
                                <Button className="button-delete"><Trash className="text-white" /></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GamesTable;