/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { fetchGame, updateGame } from "../../redux/actions/games";
import { useDispatch } from "react-redux";
import { getCategories } from "../../redux/actions/category";
import { toast } from "react-toastify";

const UpdateGame = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [game, setGame] = useState();
    const [errors, setErrors] = useState({});
    const [gameUpdate, setGameUpdate] = useState({
        description: "",
        price: 0,
        cover: null,
        coverLarge: null,
        categoriesId: [],
    });
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState([]);

    const handleChange = (field, value) => {
        setGameUpdate(prev => ({ ...prev, [field]: value }));
    };

    const handleFileChange = (field, file) => {
        setGameUpdate(prev => ({ ...prev, [field]: file }));
    };

    const addCategory = () => {
        if (selectedCategory && !gameUpdate.categoriesId.includes(Number(selectedCategory))) {
            setGameUpdate(prev => ({
                ...prev,
                categoriesId: [...prev.categoriesId, Number(selectedCategory)],
            }));
            setSelectedCategory("");
        }
    };

    const removeCategory = (index) => {
        setGameUpdate(prev => ({
            ...prev,
            categoriesId: prev.categoriesId.filter((_, i) => i !== index),
        }));
    };

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
    };

    const getGame = async () => {
        const { game, error } = await fetchGame(id);

        if (!error) {
            dispatch({
                type: "UPDATE"
            });
            setGame(game);
        } else {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!gameUpdate.description.trim()) newErrors.description = "La descrizione è obbligatoria.";
        if (!gameUpdate.price || gameUpdate.price < 0) newErrors.price = "Inserisci un valore valido.";
        if (gameUpdate.categoriesId.length === 0) newErrors.categoriesId = "Seleziona almeno una categoria.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        const formData = gameToFormData(gameUpdate);
        try {
            const response = await updateGame(id, formData);
            if (response.success) {
                toast.success(response.message);
                dispatch({
                    type: "UPDATE"
                });
                navigate("/admin");
            } else {
                toast.error(response.message);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const gameToFormData = (game) => {
        const formData = new FormData();

        formData.append("Description", game.description);
        formData.append("Price", game.price);
        if (game.cover) formData.append("Cover", game.cover);
        if (game.coverLarge) formData.append("CoverLarge", game.coverLarge);
        game.categoriesId.forEach(id => {
            formData.append("Categories", id);
        });

        return formData;
    };

    useEffect(() => {
        getGame();
        fetchCategories();
    }, [id]);

    useEffect(() => {
        if (game && categories) {
            setGameUpdate({
                description: game.description || "",
                price: game.price || "",
                cover: game.cover || "",
                coverLarge: game.coverLarge || "",
                categoriesId: game.categories?.map(gameCategory => {
                    const matchingCategory = categories.find(cat => cat.name === gameCategory.name);
                    return matchingCategory ? matchingCategory.id : null;
                }).filter(id => id !== null) || []
            });
        }
    }, [game, categories]);
    return (
        <Container className="margin-top-custom">
            {game &&
                <>
                    <h3 className="mb-4 text-white">Aggiorna {game.title}</h3>
                    <Form onSubmit={handleSubmit} className="bg-dark p-4 rounded shadow">

                        {/* Descrizione */}
                        <Form.Group className="mb-4">
                            <Form.Label className="text-uppercase text-secondary small">Descrizione</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={gameUpdate.description}
                                onChange={(e) => handleChange("description", e.target.value)}
                                className="bg-black text-white border-secondary form-control-custom"
                            />
                            {errors.description && <div className="text-danger small mt-1">{errors.description}</div>}
                        </Form.Group>

                        {/* Prezzo */}
                        <Form.Group className="mb-4">
                            <Form.Label className="text-uppercase text-secondary small">Prezzo</Form.Label>
                            <Form.Control
                                type="number"
                                value={gameUpdate.price}
                                onChange={(e) => handleChange("price", e.target.value)}
                                className="bg-black text-white border-secondary form-control-custom"
                            />
                            {errors.price && <div className="text-danger small mt-1">{errors.price}</div>}
                        </Form.Group>

                        {/* Cover */}
                        <Form.Group className="mb-4">
                            <Form.Label className="text-uppercase text-secondary small">Copertina (piccola)</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(e) => handleFileChange("cover", e.target.files[0])}
                                className="bg-black text-white border-secondary form-control-custom"
                            />
                            {errors.cover && <div className="text-danger small mt-1">{errors.cover}</div>}
                        </Form.Group>

                        {/* Cover Large */}
                        <Form.Group className="mb-4">
                            <Form.Label className="text-uppercase text-secondary small">Copertina (grande)</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(e) => handleFileChange("coverLarge", e.target.files[0])}
                                className="bg-black text-white border-secondary form-control-custom"
                            />
                            {errors.coverLarge && <div className="text-danger small mt-1">{errors.coverLarge}</div>}
                        </Form.Group>

                        {/* Categorie dinamiche */}
                        <Form.Group className="mb-4">
                            <Form.Label className="text-uppercase text-secondary small">Categorie</Form.Label>
                            <Row className="g-2">
                                <Col md={8}>
                                    <Form.Select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="bg-black text-white border-secondary form-control-custom"
                                    >
                                        <option value="">-- Seleziona una categoria --</option>
                                        {categories.length > 0 &&
                                            categories.map((cat, idx) => (
                                                <option key={idx} value={cat.id}>
                                                    {cat.name}
                                                </option>
                                            ))}
                                    </Form.Select>
                                </Col>
                                <Col md={4}>
                                    <Button variant="success" className="w-100" onClick={addCategory}>Aggiungi</Button>
                                </Col>
                            </Row>

                            <div className="mt-3">
                                {gameUpdate.categoriesId.map((catId, index) => {
                                    const category = categories.find(c => c.id === catId);
                                    return (
                                        <div key={index} className="d-inline-block me-2 mb-2">
                                            <span className="badge bg-primary p-2">
                                                {category ? category.name : "Categoria sconosciuta"}
                                                <Button
                                                    variant="link"
                                                    size="sm"
                                                    className="text-white text-decoration-none ms-2 p-0"
                                                    onClick={() => removeCategory(index)}
                                                >
                                                    ❌
                                                </Button>
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                            {errors.categoriesId && <div className="text-danger small mt-2">{errors.categoriesId}</div>}
                        </Form.Group>
                        <button type="submit" className="custom-button me-3">Aggiorna gioco</button>
                        <button type="button" className="custom-button-danger" onClick={() => navigate("/admin")}>Annulla</button>
                    </ Form>
                </>
            }
        </Container>
    );
}

export default UpdateGame;