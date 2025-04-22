import { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";

const FormSetting = ({ profile }) => {
    const [profileChanges, setProfileChanges] = useState({
        userName: profile.userName,
        email: profile.email,
        phoneNumber: profile.phoneNumber
    });

    const handleChange = (field, value) => {
        setProfileChanges(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submit changes", profileChanges);
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

                <Button variant="primary" type="submit" className="mt-3 px-4 button=custom-form">
                    Salva
                </Button>
            </Form>
        </Col>
    );
}

export default FormSetting;