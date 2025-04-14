import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginAccount, SetToken } from "../../redux/actions/account";
import { FloatingLabel, Form } from "react-bootstrap";

const Login = () => {
    const [form, setForm] = useState({
        userName: "",
        password: "",
    });

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();
        await LoginAccount(form);
        dispatch(SetToken());
        navigate("/")
    };

    return (
        <div className="d-flex justify-content-center align-items-center my-auto" style={{height: "40rem"}}>
            <Form onSubmit={handleSubmit} className="bg-secondary p-4 rounded-4 shadow w-100" style={{ maxWidth: '400px' }}>
                <h2 className="text-center text-light mb-4">
                    Accedi
                </h2>

                <FloatingLabel controlId="floatingEmail" label="Username" className="mb-3 text-dark">
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        value={form.userName}
                        onChange={(e) => setForm({ ...form, userName: e.target.value })}
                    />
                </FloatingLabel>

                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-4 text-dark">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                </FloatingLabel>

                <div className="d-grid">
                    <button type="submit" className="btn btn-success fs-5">
                        Login
                    </button>
                </div>
            </Form>
        </div>
    );
}

export default Login;