import { useState } from "react";
import { Button } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import ModalDelete from "./ModalDelete";
import { toast } from "react-toastify";
import { deleteCategory } from "../../redux/actions/category";
import { useDispatch } from "react-redux";

const CategoryTable = ({ categories }) => {
    const [modalShow, setModalShow] = useState(false);
    const [selectedId, setSelectedId] = useState("");
    const dispatch = useDispatch();

    const handleDelete = async () => {
        toast.promise(
            (async () => {
                const response = await deleteCategory(selectedId);
                if (!response.success) {
                    throw new Error(response.message);
                }
                return response.message;
            })(),
            {
                pending: "Caricamento in corso...",
                success: "Categoria eliminata con successo!",
                error: "Si è verificato un errore durante il caricamento."
            }
        ).then(() => {
            dispatch({ type: "UPDATE" });
        });
    }

    return (
        <div className="rounded" style={{ backgroundColor: "#212529" }}>
            <table className="text-white w-100 table table-custom align-middle mt-3">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Azioni</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((cat, i) => (
                        <tr key={i}>
                            <td>{cat.id}</td>
                            <td>{cat.name}</td>
                            <td><Button className="me-2 button-delete" onClick={() => { setModalShow(true); setSelectedId(cat.id); }}><Trash className="text-white" /></Button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ModalDelete show={modalShow} onHide={() => setModalShow(false)} handleDelete={() => handleDelete()} />
        </div>
    );
}

export default CategoryTable;