import { useState } from "react";
import { FloatingLabel, Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RegisterAccount } from "../../redux/actions/account";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { toast } from "react-toastify";

const Register = () => {
    const navigate = useNavigate();
    const [submit, setSubmit] = useState(true);
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        phone: "",
        birthDate: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        // Campi vuoti
        for (const field in form) {
            if (!form[field]) {
                newErrors[field] = "Questo campo è obbligatorio.";
            }
        }

        // Email valida
        if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "Inserisci un indirizzo email valido.";
        }

        // Password con almeno una maiuscola e un numero
        if (form.password) {
            if (form.password.length < 8) {
                newErrors.password = "La password deve contenere almeno 8 caratteri.";
            }
            else if (!/(?=.*[A-Z])(?=.*\d)/.test(form.password)) {
                newErrors.password = "La password deve contenere almeno una lettera maiuscola e un numero.";
            }
        }

        // Cellulare: solo 10 cifre
        if (form.phone && !/^\d{10}$/.test(form.phone)) {
            newErrors.phone = "Il numero di cellulare deve contenere esattamente 10 cifre.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const response = await RegisterAccount(form);
        if (!response.success) {
            setSubmit(false);
            toast.error(response.message);
        } else {
            setSubmit(true);
            navigate("/login");
            toast.success("Utente registrato con successo, è possibile effetturare l'accesso!");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center margin-top-custom">
            <Form onSubmit={handleSubmit} className="background-grey p-4 rounded-4 shadow w-100" style={{ maxWidth: '400px' }}>
                <h2 className="text-center text-light mb-4">Registrati</h2>
                {!submit && <div className="text-center"><p className="text-danger">Errore nella registrazione!</p></div>}
                <FloatingLabel label="Nome" className="mb-3 text-dark">
                    <Form.Control
                        type="text"
                        placeholder="Nome"
                        value={form.firstName}
                        isInvalid={!!errors.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    />
                    <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel label="Cognome" className="mb-3 text-dark">
                    <Form.Control
                        type="text"
                        placeholder="Cognome"
                        value={form.lastName}
                        isInvalid={!!errors.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    />
                    <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel label="Username" className="mb-3 text-dark">
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        value={form.userName}
                        isInvalid={!!errors.userName}
                        onChange={(e) => setForm({ ...form, userName: e.target.value })}
                    />
                    <Form.Control.Feedback type="invalid">{errors.userName}</Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel label="Email" className="mb-3 text-dark">
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        isInvalid={!!errors.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </FloatingLabel>

                <Form.Group className="mb-3">
                    <InputGroup>
                        <Form.Control
                            className="p-3"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={form.password}
                            isInvalid={!!errors.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                        <InputGroup.Text
                            onClick={() => setShowPassword(!showPassword)}
                            className="bg-white border-start-0 rounded-end"
                            style={{ cursor: "pointer" }}
                        >
                            {showPassword ? <EyeSlash /> : <Eye />}
                        </InputGroup.Text>
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <FloatingLabel label="Cellulare" className="mb-3 text-dark">
                    <Form.Control
                        type="text"
                        placeholder="Cellulare"
                        value={form.phone}
                        isInvalid={!!errors.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                    <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel label="Data di nascita" className="mb-3 text-dark">
                    <Form.Control
                        type="date"
                        placeholder="Data di nascita"
                        value={form.birthDate}
                        isInvalid={!!errors.birthDate}
                        onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
                    />
                    <Form.Control.Feedback type="invalid">{errors.birthDate}</Form.Control.Feedback>
                </FloatingLabel>

                <div className="d-grid mb-3">
                    <button type="submit" className="btn btn-success fs-5">Registrati</button>
                </div>

                <div className="text-center">
                    <span className="text-light">Hai già un account? </span>
                    <Link to="/login" className="text-success fw-semibold text-decoration-none">Accedi</Link>
                </div>
            </Form>
        </div>
    );
};

export default Register;
