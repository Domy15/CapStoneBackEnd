import { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { AutoLogin, updateProfile } from "../../redux/actions/account";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const FormSetting = ({ profile }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [profileChanges, setProfileChanges] = useState({
        userName: profile.userName,
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phoneNumber: profile.phone
    });
    const [errors, setErrors] = useState({});

    const handleChange = (field, value) => {
        setProfileChanges(prev => ({ ...prev, [field]: value }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!profileChanges.userName) {
            newErrors.userName = "Il nome del profilo è obbligatorio";
        }
        if (!profileChanges.firstName) {
            newErrors.firstName = "Il nome vero è obbligatorio";
        }
        if (!profileChanges.lastName) {
            newErrors.lastName = "Il cognome è obbligatorio";
        }
        if (!profileChanges.email || !/\S+@\S+\.\S+/.test(profileChanges.email)) {
            newErrors.email = "Email non valida";
        }
        if (!profileChanges.phoneNumber || !/^\d{10}$/.test(profileChanges.phoneNumber)) {
            newErrors.phoneNumber = "Numero di telefono non valido (deve contenere 10 cifre)";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const response = await updateProfile(profile.userName, profileChanges);
                if (response) {
                    dispatch(AutoLogin());
                    toast.success("Dati del profilo aggiornati!");
                    navigate("/profile");
                } else {
                    console.log("Errore nell'aggiornamento dei dati!");
                    toast.error("Errore nel salvataggio del profilo!");
                }
            }
            catch (error) {
                console.log(error);
                toast.error("Errore nel salvataggio del profilo!");
            }
        }
    };

    return (
        <Col md={9}>
            <h3 className="mb-3 text-white">Dati generali del profilo</h3>
            <p className="text-secondary">Imposta il nome e i dettagli del tuo profilo.</p>

            <Form onSubmit={handleSubmit} className="bg-dark p-4 rounded shadow">
                {/* Nome del profilo */}
                <Form.Group className="mb-4">
                    <Form.Label className="text-uppercase text-secondary small">Nome del profilo</Form.Label>
                    <Form.Control
                        type="text"
                        value={profileChanges.userName}
                        onChange={(e) => handleChange("userName", e.target.value)}
                        className={`bg-black text-white border-secondary form-control-custom ${errors.userName ? "is-invalid" : ""}`}
                    />
                    {errors.userName && <div className="invalid-feedback">{errors.userName}</div>}
                </Form.Group>

                {/* Nome vero */}
                <Form.Group className="mb-4">
                    <Form.Label className="text-uppercase text-secondary small">Nome vero</Form.Label>
                    <Form.Control
                        type="text"
                        value={profileChanges.firstName}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                        className={`bg-black text-white border-secondary form-control-custom ${errors.firstName ? "is-invalid" : ""}`}
                    />
                    {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                </Form.Group>

                {/* Cognome */}
                <Form.Group className="mb-4">
                    <Form.Label className="text-uppercase text-secondary small">Cognome</Form.Label>
                    <Form.Control
                        type="text"
                        value={profileChanges.lastName}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                        className={`bg-black text-white border-secondary form-control-custom ${errors.lastName ? "is-invalid" : ""}`}
                    />
                    {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-4">
                    <Form.Label className="text-uppercase text-secondary small">Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={profileChanges.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className={`bg-black text-white border-secondary form-control-custom ${errors.email ? "is-invalid" : ""}`}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </Form.Group>

                {/* Numero di telefono */}
                <Form.Group className="mb-4">
                    <Form.Label className="text-uppercase text-secondary small">Numero di telefono</Form.Label>
                    <Form.Control
                        type="tel"
                        value={profileChanges.phoneNumber}
                        onChange={(e) => handleChange("phoneNumber", e.target.value)}
                        className={`bg-black text-white border-secondary form-control-custom ${errors.phoneNumber ? "is-invalid" : ""}`}
                    />
                    {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
                </Form.Group>

                <button type="submit" className="mt-3 px-4 custom-button">
                    Salva
                </button>
            </Form>
        </Col>
    );
}

export default FormSetting;