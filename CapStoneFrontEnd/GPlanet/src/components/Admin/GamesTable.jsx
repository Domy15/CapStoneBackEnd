import { useState } from "react";
import { Button } from "react-bootstrap";
import { Image, Pencil, Trash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import ModalDelete from "./ModalDelete";
import { deleteGame } from "../../redux/actions/games";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const GamesTable = ({ games, sliceNumber }) => {
    const navigate = useNavigate();
    const [modalShow, setModalShow] = useState(false);
    const [selectedId, setSelectedId] = useState("");
    const dispatch = useDispatch();

    const handleDelete = async (id) => {
        try {
            const response = await deleteGame(id);
            if (response.success) {
                toast.success(response.message);
                dispatch({
                    type: "UPDATE"
                });
            } else {
                toast.error(response.message);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

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
                            <td onClick={() => navigate(`/game/${game.id}`)} style={{ cursor: "pointer" }}>
                                <img
                                    src={game.cover.startsWith("http") ? game.cover : `https://localhost:7227/${game.cover}`}
                                    alt={game.title}
                                    style={{ width: "3.5em", height: "3.5em", objectFit: "cover", borderRadius: "8px" }}
                                />
                            </td>
                            <td onClick={() => navigate(`/game/${game.id}`)} style={{ cursor: "pointer" }}>{game.title}</td>
                            <td>
                                {game.categories && game.categories.length > 0 &&
                                    game.categories.map((category, index) => (
                                        <span key={index} className="badge bg-primary me-1">
                                            {category.name}
                                        </span>))}
                            </td>
                            <td>{game.company}</td>
                            <td>{game.price > 0 ? `${game.price}€` : "Free-to-Play"}</td>
                            <td style={{ whiteSpace: "nowrap" }}>
                                <Button className="me-1 button-update" onClick={() => navigate(`/admin/${game.id}`)}><Pencil className="text-white" /></Button>
                                <Button className="me-1 button-delete" onClick={() => { setModalShow(true); setSelectedId(game.id); }}><Trash className="text-white" /></Button>
                                <Button className="button-add" onClick={() => navigate(`/admin/extraImges/${game.id}`)}><Image className="text-white" /></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ModalDelete show={modalShow} onHide={() => setModalShow(false)} handleDelete={() => handleDelete(selectedId)} />
        </div>
    );
}

export default GamesTable;