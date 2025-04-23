import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { LoginAccount, SetToken } from "../../redux/actions/account";
import { FloatingLabel, Form, InputGroup } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { toast } from "react-toastify";

const Login = () => {
    const [form, setForm] = useState({
        userName: "",
        password: "",
    });
    const [isCorrect, setIsCorrect] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await LoginAccount(form);
        dispatch(SetToken());
        if (response) {
            setIsCorrect(true);
            navigate("/");
            toast.success(`Benvenuto ${form.userName}`);
        }
        else {
            setIsCorrect(false);
            toast.error("Credenziali errate!");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center margin-top-library" style={{ height: "40rem" }}>
            <Form onSubmit={handleSubmit} className="background-grey p-4 rounded-4 shadow w-100" style={{ maxWidth: '400px' }}>
                <h2 className="text-center text-light mb-4">
                    Accedi
                </h2>
                {!isCorrect && <div className="text-center"><p className="text-danger">Username o password errata! Riprova. </p></div>}
                <FloatingLabel controlId="floatingEmail" label="Username" className="mb-3 text-dark">
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        value={form.userName}
                        onChange={(e) => setForm({ ...form, userName: e.target.value })}
                    />
                </FloatingLabel>

                <Form.Group className="mb-3">
                    <InputGroup>
                        <Form.Control
                            className="p-3"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                        <InputGroup.Text
                            onClick={() => setShowPassword(!showPassword)}
                            className="bg-white border-start-0 rounded-end"
                            style={{ cursor: "pointer" }}
                        >
                            {showPassword ? <EyeSlash /> : <Eye />}
                        </InputGroup.Text>
                    </InputGroup>
                </Form.Group>

                <div className="d-grid">
                    <button type="submit" className="btn btn-success fs-5">
                        Login
                    </button>
                </div>
                <div className="text-center">
                    <span className="text-light">Non hai un account? </span>
                    <Link to="/register" className="text-success fw-semibold text-decoration-none">
                        Registrati
                    </Link>
                </div>
            </Form>
        </div>
    );
}

export default Login;