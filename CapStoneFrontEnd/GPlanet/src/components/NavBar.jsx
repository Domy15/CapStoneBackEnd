import { Image, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Person } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useMatch, useNavigate } from "react-router-dom";
import { getProfile, Logout } from "../redux/actions/account";
import { useEffect, useState } from "react";
import logo from "../assets/LogoGPlanet.png"
import { toast } from "react-toastify";

const NavBar = () => {
    const profile = useSelector(state => state.profile);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const isGameDetail = useMatch("/game/:id");
    const isVisible = ["/", "/games"].includes(location.pathname) || isGameDetail;
    const isPath = location.pathname.startsWith("/profile") || location.pathname === "/login" || location.pathname === "/register";
    const [account, setAccount] = useState();

    const logoutAccount = () => {
        dispatch(Logout())
        navigate("/login")
    }

    const fetchProfile = async () => {
        try {
            const data = await getProfile();
            console.log(data.profile.imageProfile);
            setAccount(data.profile);
        } catch (error) {
            toast.error("Errore nel caricamento del profilo: ", error);
        }
    };

    useEffect(() => {
        if (profile.userName) {
            fetchProfile();
        }
    }, [profile])

    return (
        <Navbar className="background-green navbar-custom" data-bs-theme="dark">
            <div className="d-flex mx-auto align-items-center" style={{ width: "95%" }}>
                <Link to={"/"} className=" navbar-brand"><img src={logo} style={{ width: "3.5em" }} /></Link>
                <Nav className="me-auto">
                    <Link to={"/"} className={`fs-4 nav-link ${isVisible ? "active-link" : ""}`}>
                        NEGOZIO
                    </Link>

                    <Link to={profile?.userName ? `/library/${profile.userName}` : "/login"} className={`fs-4 nav-link ${location.pathname === `/library/${profile.userName}` ? "active-link" : ""}`}>
                        LIBRERIA
                    </Link>

                    <Link to={profile?.userName ? "/profile" : "/login"} className={`nav-link fs-4 ${isPath ? "active-link" : ""}`}>
                        {profile.userName != null ? profile.userName.toUpperCase() : 'ACCOUNT'}
                    </Link>

                    {profile.role === "Admin" && (
                        <Link to="/admin" className={`fs-4 nav-link ${location.pathname.startsWith("/admin") ? "active-link" : ""}`}>
                            GESTIONE
                        </Link>
                    )}
                </Nav>

                <NavDropdown title={account && profile.userName ? <Image
                    src={
                        account.imageProfile
                            ? `https://localhost:7227/${account.imageProfile}`
                            : "https://sdmntpritalynorth.oaiusercontent.com/files/00000000-1778-6246-b593-32c3ea8d9707/raw?se=2025-04-22T12%3A39%3A20Z&sp=r&sv=2024-08-04&sr=b&scid=df085146-a50b-5979-b31e-5296d4f5e8f0&skoid=59d06260-d7df-416c-92f4-051f0b47c607&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-22T05%3A32%3A04Z&ske=2025-04-23T05%3A32%3A04Z&sks=b&skv=2024-08-04&sig=itbxPBU55Qn2Ku%2Bi9/TPQnjegoPTrToPSs9cJOfvNnI%3D"
                    }
                    roundedCircle
                    className="img-thumbnail border border-primary bg-dark avatar-navbar"
                /> : <Person />}
                    id="basic-nav-dropdown" className="ms-auto text-secondary fs-4" align="end">
                    {profile.userName != null ? (
                        <>
                            <NavDropdown.Item onClick={logoutAccount}>Esci</NavDropdown.Item>
                        </>
                    ) : (
                        <>
                            <NavDropdown.Item as={Link} to="/register">Registrati</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/login">Accedi</NavDropdown.Item>
                        </>
                    )}
                </NavDropdown>
            </div>
        </Navbar>
    );
}

export default NavBar;