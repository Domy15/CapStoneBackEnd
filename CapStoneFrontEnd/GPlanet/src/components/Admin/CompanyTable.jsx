import { Button } from "react-bootstrap";
import { Pencil } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import ModalAction from "./ModalAction";
import { useState } from "react";
import { updateCompany } from "../../redux/actions/company";
import { toast } from "react-toastify";

const CompanyTable = ({ companies }) => {
    const [modalShow, setModalShow] = useState(false);
    const [selectedId, setSelectedId] = useState("");
    const dispatch = useDispatch();

    const handleUpdate = async (name) => {
        toast.promise(
            (async () => {
                const response = await updateCompany(selectedId, name);
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
                    {companies.map((comp, i) => (
                        <tr key={i}>
                            <td>{comp.id}</td>
                            <td>{comp.name}</td>
                            <td><Button className="me-2 button-update" onClick={() => { setModalShow(true); setSelectedId(comp.id); }}><Pencil className="text-white" /></Button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ModalAction show={modalShow} onHide={() => setModalShow(false)} handleAction={handleUpdate} />
        </div>
    );
}

export default CompanyTable;