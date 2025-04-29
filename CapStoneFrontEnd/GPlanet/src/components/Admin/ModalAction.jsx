import { useState } from "react";
import { Form, Modal } from "react-bootstrap";

const ModalAction = ({ show, onHide, handleAction }) => {
    const [element, setElement] = useState("");
    const [error, setError] = useState(null);

    const handleClick = () => {
        if (!element.trim()) {
            setError("Il campo non può essere vuoto!");
            return;
        }
        handleAction(element);
        setElement("");
        onHide();
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            contentClassName="custom-modal text-white"
        >
            <Modal.Header closeButton className="border-custom">
                <Modal.Title>Aggiungi elemento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-4">
                    <Form.Label className="text-uppercase text-secondary small">Nome categoria</Form.Label>
                    <Form.Control
                        type="text"
                        value={element}
                        onChange={(e) => setElement(e.target.value)}
                        className={`bg-black text-white border-secondary form-control-custom ${error ? "is-invalid" : ""}`}
                    />
                    {error && <div className="invalid-feedback">{error}</div>}
                </Form.Group>
            </Modal.Body>
            <Modal.Footer className="border-custom">
                <button className="custom-button-secondary" onClick={onHide}>
                    Annulla
                </button>
                <button className="custom-button-danger" onClick={handleClick}>
                    Aggiungi
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalAction;