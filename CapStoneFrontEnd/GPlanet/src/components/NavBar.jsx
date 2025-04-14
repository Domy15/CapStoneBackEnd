import { Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NavBar = () => {
    const profile = useSelector(state => state.profile);

    return (
        <Navbar className="background-green" data-bs-theme="dark">
            <div className="d-flex mx-auto align-items-center" style={{ width: "95%" }}>
                <Link to={"/"} className=" navbar-brand"><img src="src\assets\LogoGPlanet.png" style={{ width: "3.5em" }} /></Link>
                <Nav className="me-auto">
                    <Link to={"/"} className="fs-4 nav-link">HOME</Link>
                    <Link to={"/library"} className="fs-4 nav-link">LIBRERIA</Link>
                    <Link to={profile?.userName ? "/profile" : "/login"} className="nav-link fs-4"> {profile?.userName ?? 'ACCOUNT'}</Link>
                </Nav>
            </div>
        </Navbar>
    );
}

export default NavBar;