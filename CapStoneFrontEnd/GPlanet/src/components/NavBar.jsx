import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Person } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Logout } from "../redux/actions/account";
import { useEffect } from "react";

const NavBar = () => {
    const profile = useSelector(state => state.profile);
    const dispatch = useDispatch()
    const navigateTo = useNavigate()

    const logoutAccount = () => {
        dispatch(Logout())
        navigateTo("/login")
    }

    useEffect(() => {
    }, [profile])
    
    return (
        <Navbar className="background-green" data-bs-theme="dark">
            <div className="d-flex mx-auto align-items-center" style={{ width: "95%" }}>
                <Link to={"/"} className=" navbar-brand"><img src="src\assets\LogoGPlanet.png" style={{ width: "3.5em" }} /></Link>
                <Nav className="me-auto">
                    <Link to={"/"} className="fs-4 nav-link">HOME</Link>
                    <Link to={"/library"} className="fs-4 nav-link">LIBRERIA</Link>
                    <Link to={profile?.userName ? "/profile" : "/login"} className="nav-link fs-4"> {profile.userName != null ? profile.userName.toUpperCase() : 'ACCOUNT'}</Link>
                </Nav>

                <NavDropdown title={<Person />} id="basic-nav-dropdown" className="ms-auto text-secondary fs-4" align="end">
                    {profile.userName != null ? (
                        <NavDropdown.Item onClick={logoutAccount}>Logout</NavDropdown.Item>
                    ) : (
                        <>
                            <NavDropdown.Item as={Link} to="/register">Register</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
                        </>
                    )}
                </NavDropdown>
            </div>
        </Navbar>
    );
}

export default NavBar;