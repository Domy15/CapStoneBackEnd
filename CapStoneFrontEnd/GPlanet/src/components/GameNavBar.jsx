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
                <Navbar expand="lg" className="shadow-sm animated-gradient custom-navbar">
                    <Container>
                        <Nav className="me-auto">
                            <Link className="text-light nav-link mx-2" to="/">Home</Link>
                            <Link className="text-light nav-link mx-2" to="/games">Giochi</Link>
                            <div
                                onMouseEnter={() => setShowCategories(true)}
                                onMouseLeave={() => setShowCategories(false)}
                                className="dropdown-wrapper"
                            >
                                <Nav.Link className="text-light mx-2">Categorie</Nav.Link>

                                {showCategories && (
                                    <div className="category-dropdown">
                                        {categories.map((cat, i) => (
                                            <a
                                                href="#"
                                                key={i}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setShowCategories(false);
                                                    navigate("/games", { state: { category: cat.name } });
                                                }}
                                                className="category-item"
                                            >
                                                {cat.name}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Nav>

                        <Form className="d-flex search-form" onSubmit={handleSubmit}>
                            <FormControl
                                value={search}
                                onChange={(e) => (setSearch(e.target.value))}
                                type="search"
                                placeholder="Cerca"
                                className="text-light custom-search"
                            />
                            <Button type="submit" variant="link" className="search-button">
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