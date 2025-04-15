import { useState } from "react";
import { Button, Col, Container, Form, FormControl, Nav, Navbar, Row } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { Link, useLocation, useMatch, useNavigate } from "react-router-dom";

const GameNavBar = () => {
    const [search, setSearch] = useState("");
    const { pathname } = useLocation();
    const isGameDetail = useMatch("/game/:id");
    const isVisible = ["/", "/games"].includes(pathname) || isGameDetail;
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate("/games", {
                state: { search },
            });
        }
    }

    return (
        <>
            {isVisible &&
                <Container className="mt-4">
                    <Navbar
                        expand="lg"
                        style={{ paddingTop: "0.5rem", paddingBottom: "0.5rem", }}
                        className="shadow-sm animated-gradient">
                        <Container>
                            <Nav className="me-auto">
                                <Link className="text-light nav-link mx-2" to="/">Home</Link>
                                <Link className="text-light nav-link mx-2" to="/games">Giochi</Link>
                                <Link className="text-light nav-link mx-2">Categorie</Link>
                            </Nav>

                            <Form className="d-flex" style={{ position: "relative", minWidth: "240px" }} onSubmit={handleSubmit}>
                                <FormControl
                                    value={search}
                                    onChange={(e) => (setSearch(e.target.value))}
                                    type="search"
                                    placeholder="Cerca"
                                    className="text-light custom-search"
                                    style={{
                                        backgroundColor: "#0b2a23",
                                        border: "none",
                                        color: "#fff",
                                        padding: "0.5rem 0.75rem",
                                        paddingRight: "40px",
                                        borderRadius: "4px",
                                        width: "100%",
                                    }} />
                                <Button
                                    type="submit"
                                    variant="link"
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        right: "10px",
                                        transform: "translateY(-50%)",
                                        color: "#ccc",
                                        padding: 0,
                                        border: "none",
                                    }}>
                                    <Search />
                                </Button>
                            </Form>
                        </Container>
                    </Navbar>
                </Container>
            }
        </>
    );
}

export default GameNavBar;