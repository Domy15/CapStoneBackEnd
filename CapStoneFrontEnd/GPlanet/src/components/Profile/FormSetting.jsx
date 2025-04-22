import { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";

const FormSetting = ({ profile }) => {
    const [profileChanges, setProfileChanges] = useState({
        userName: profile.userName,
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phoneNumber: profile.phone
    });

    const handleChange = (field, value) => {
        setProfileChanges(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const response = "fetch";
        }
        catch (error){
            console.log(error);
        }
    };

    return (
        <Col md={9}>
            <h3 className="mb-3 text-white">Dati generali del profilo</h3>
            <p className="text-secondary">Imposta il nome e i dettagli del tuo profilo.</p>

            <Form onSubmit={handleSubmit} className="bg-dark p-4 rounded shadow">
                <Form.Group className="mb-4">
                    <Form.Label className="text-uppercase text-secondary small">Nome del profilo</Form.Label>
                    <Form.Control
                        type="text"
                        value={profileChanges.userName}
                        onChange={(e) => handleChange("userName", e.target.value)}
                        className="bg-black text-white border-secondary form-control-custom"
                    />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label className="text-uppercase text-secondary small">Nome vero</Form.Label>
                    <Form.Control
                        type="text"
                        value={profileChanges.firstName}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                        className="bg-black text-white border-secondary form-control-custom"
                    />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label className="text-uppercase text-secondary small">Cognome</Form.Label>
                    <Form.Control
                        type="text"
                        value={profileChanges.lastName}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                        className="bg-black text-white border-secondary form-control-custom"
                    />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label className="text-uppercase text-secondary small">Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={profileChanges.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="bg-black text-white border-secondary form-control-custom"
                    />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label className="text-uppercase text-secondary small">Numero di telefono</Form.Label>
                    <Form.Control
                        type="text"
                        value={profileChanges.phoneNumber}
                        onChange={(e) => handleChange("phoneNumber", e.target.value)}
                        className="bg-black text-white border-secondary form-control-custom"
                    />
                </Form.Group>

                <button  type="submit" className="mt-3 px-4 custom-button">
                    Salva
                </button>
            </Form>
        </Col>
    );
}

export default FormSetting;