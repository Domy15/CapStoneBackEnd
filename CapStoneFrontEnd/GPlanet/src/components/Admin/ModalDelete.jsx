import { Modal } from "react-bootstrap";

const ModalDelete = ({ show, onHide, handleDelete }) => {

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
                <p>Sei sicuro di voler eliminare l'elemento?</p>
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