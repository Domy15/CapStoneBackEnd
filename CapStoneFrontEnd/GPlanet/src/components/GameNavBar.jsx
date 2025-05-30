/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Badge, Button, Container, Form, FormControl, Nav, Navbar, Row } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { Link, useLocation, useMatch, useNavigate } from "react-router-dom";
import { getCategories } from "../redux/actions/category";

const GameNavBar = () => {
    const update = useSelector(state => state.update);
    const userName = useSelector(state => state.profile.userName);
    const [search, setSearch] = useState("");
    const [categories, setCategories] = useState([]);
    const [showCategories, setShowCategories] = useState(false);
    const [wishList, setWishList] = useState([]);
    const [cart, setCart] = useState([]);
    const { pathname } = useLocation();
    const isGameDetail = useMatch("/game/:id");
    const isWishList = useMatch("/wishList/:userName");
    const isCart = useMatch("/cart/:userName");
    const isVisible = ["/", "/games"].includes(pathname) || isGameDetail || isWishList || isCart;
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate("/games", {
                state: { search },
            });
        }
    }

    const fetchCategories = async () => {
        try {
            const response = await getCategories();
            if (response) {
                setCategories(response);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const getWishlist = async () => {
        const getToken = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await fetch(`https://localhost:7227/api/WishList/${userName}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${getToken.token}`,
                }
            });
            if (response.ok) {
                const data = await response.json();
                setWishList(data.wishList);
            } else {
                throw new Error("Errore nel recupero dei dati!");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const getCart = async () => {
        const getToken = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await fetch(`https://localhost:7227/api/Cart/${userName}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${getToken.token}`,
                }
            });
            if (response.ok) {
                const data = await response.json();
                setCart(data.cart);
            } else {
                throw new Error("Errore nel recupero dei dati!");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    useEffect(() => {
        if (userName) {
            getWishlist();
            getCart();
        }
    }, [userName, update])
    return (
        <>
            {isVisible &&
                <Container className="margin-top-custom">
                    <div className="d-flex justify-content-end">
                        {wishList.length > 0 &&
                            <Badge bg="success" className="custom-wishlist-badge" onClick={() => navigate(`/wishList/${userName}`)}>
                                Lista dei desideri ({wishList.length})
                            </Badge>}
                        {cart.length > 0 &&
                            <Badge bg="primary" className="custom-cart-badge" onClick={() => navigate(`/cart/${userName}`)}>
                                Carrello ({cart.length})
                            </Badge>}
                    </div>
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