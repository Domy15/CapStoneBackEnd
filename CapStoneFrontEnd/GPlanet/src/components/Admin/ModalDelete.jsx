import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteGame } from "../../redux/actions/games";

const ModalDelete = ({ show, onHide, id }) => {
    const dispatch = useDispatch();

    const handleDelete = async () => {
        try{
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
        <Modal
            show={show}
            onHide={onHide}
            centered
            contentClassName="custom-modal text-white"
        >
            <Modal.Header closeButton className="border-custom">
                <Modal.Title>Conferma eliminazione</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Sei sicuro di voler eliminare il gioco?</p>
            </Modal.Body>
            <Modal.Footer className="border-custom">
                <button className="custom-button-secondary" onClick={onHide}>
                    Annulla
                </button>
                <button className="custom-button-danger" onClick={() => {handleDelete(); onHide();}}>
                    Elimina
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDelete;