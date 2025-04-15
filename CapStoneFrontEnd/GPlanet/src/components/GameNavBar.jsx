import { useEffect, useState } from "react";
import { Button, Container, Form, FormControl, Nav, Navbar, Row } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { Link, useLocation, useMatch, useNavigate } from "react-router-dom";

const GameNavBar = () => {
    const [search, setSearch] = useState("");
    const [categories, setCategories] = useState([]);
    const [showCategories, setShowCategories] = useState(false);
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

    const getCategories = async () => {
        try {
            const response = await fetch("https://localhost:7227/api/Category")
            if (response.ok) {
                const data = await response.json()
                setCategories(data.categories)
                console.log(data.categories)
            }
            else {
                throw new Error("Errore nel recupero dei dati!")
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCategories()
    }, [])
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
                                <div
                                    onMouseEnter={() => setShowCategories(true)}
                                    onMouseLeave={() => setShowCategories(false)}
                                    style={{ position: "relative" }}
                                >
                                    <Nav.Link className="text-light mx-2" style={{ cursor: "pointer" }}>
                                        Categorie
                                    </Nav.Link>

                                    {showCategories && (
                                        <div
                                            className="bg-dark text-white shadow-sm"
                                            style={{
                                                position: "absolute",
                                                top: "100%",
                                                left: 0,
                                                zIndex: 1000,
                                                minWidth: "300px",
                                                borderRadius: "4px",
                                                overflow: "hidden",
                                                padding: "10px",
                                                display: "grid",
                                                gridTemplateColumns: "repeat(3, 1fr)",
                                                gap: "10px",
                                            }}
                                        >
                                            {categories.map((cat, i) => (
                                                <a
                                                    href="#"
                                                    key={i}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setShowCategories(false);
                                                        navigate("/games", { state: { category: cat.name } });
                                                    }}
                                                    className="text-white"
                                                    style={{
                                                        padding: "8px 10px",
                                                        textDecoration: "none",
                                                        textAlign: "center",
                                                        whiteSpace: "nowrap",
                                                    }}
                                                    onMouseOver={(e) => e.currentTarget.style.textDecoration = "underline"}
                                                    onMouseOut={(e) => e.currentTarget.style.textDecoration = "none"}
                                                >
                                                    {cat.name}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
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