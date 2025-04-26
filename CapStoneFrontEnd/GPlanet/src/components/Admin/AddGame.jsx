import { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { getCategories } from "../../redux/actions/category";
import { getCompanies } from "../../redux/actions/company";
import { addGame } from "../../redux/actions/games";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddGame = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [errors, setErrors] = useState({});
    const [game, setGame] = useState({
        title: "",
        description: "",
        price: 0,
        releaseDate: "",
        cover: null,
        coverLarge: null,
        companyId: "",
        categoriesId: [],
    });

    const [selectedCategory, setSelectedCategory] = useState("");

    const handleChange = (field, value) => {
        setGame(prev => ({ ...prev, [field]: value }));
    };

    const handleFileChange = (field, file) => {
        setGame(prev => ({ ...prev, [field]: file }));
    };

    const addCategory = () => {
        if (selectedCategory && !game.categoriesId.includes(Number(selectedCategory))) {
            setGame(prev => ({
                ...prev,
                categoriesId: [...prev.categoriesId, Number(selectedCategory)],
            }));
            setSelectedCategory("");
        }
    };

    const removeCategory = (index) => {
        setGame(prev => ({
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

    const fetchCompanies = async () => {
        try {
            const response = await getCompanies();
            if (response) {
                setCompanies(response);
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!game.title.trim()) newErrors.title = "Il titolo è obbligatorio.";
        if (!game.description.trim()) newErrors.description = "La descrizione è obbligatoria.";
        if (!game.price || game.price < 0) newErrors.price = "Inserisci un valore valido.";
        if (!game.releaseDate) newErrors.releaseDate = "La data di rilascio è obbligatoria.";
        if (!game.cover || !(game.cover instanceof File)) newErrors.cover = "La copertina piccola è obbligatoria.";
        if (!game.coverLarge || !(game.coverLarge instanceof File)) newErrors.coverLarge = "La copertina grande è obbligatoria.";
        if (!game.companyId) newErrors.companyId = "Seleziona un'azienda.";
        if (game.categoriesId.length === 0) newErrors.categoriesId = "Seleziona almeno una categoria.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        const formData = gameToFormData(game);
        try {
            const response = await addGame(formData);
            if (response.success) {
                toast.success("Gioco aggiunto con successo!");
                navigate("/admin");
            } else {
                toast.error("Errore nell'aggiunta del gioco!");
            }
        }
        catch (error) {
            console.log(error);
            toast.error("Errore nell'aggiunta del gioco!");
        }
    };

    const gameToFormData = (game) => {
        const formData = new FormData();

        formData.append("Title", game.title);
        formData.append("Description", game.description);
        formData.append("Price", game.price);
        formData.append("ReleaseDate", game.releaseDate);
        formData.append("CompanyId", game.companyId);
        formData.append("Cover", game.cover);
        formData.append("CoverLarge", game.coverLarge);
        game.categoriesId.forEach(id => {
            formData.append("CategoriesId", id);
        });

        return formData;
    };

    useEffect(() => {
        fetchCategories();
        fetchCompanies();
    }, [])
    return (
        <Container className="margin-top-custom">
            <h3 className="mb-4 text-white">Compila i campi per aggiungere un gioco</h3>
            <Form onSubmit={handleSubmit} className="bg-dark p-4 rounded shadow">
                {/* Titolo */}
                <Form.Group className="mb-4">
                    <Form.Label className="text-uppercase text-secondary small">Titolo del gioco</Form.Label>
                    <Form.Control
                        type="text"
                        value={game.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        className="bg-black text-white border-secondary form-control-custom"
                    />
                    {errors.title && <div className="text-danger small mt-1">{errors.title}</div>}
                </Form.Group>

                {/* Descrizione */}
                <Form.Group className="mb-4">
                    <Form.Label className="text-uppercase text-secondary small">Descrizione</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={game.description}
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
                        value={game.price}
                        onChange={(e) => handleChange("price", e.target.value)}
                        className="bg-black text-white border-secondary form-control-custom"
                    />
                    {errors.price && <div className="text-danger small mt-1">{errors.price}</div>}
                </Form.Group>

                {/* Data di rilascio */}
                <Form.Group className="mb-4">
                    <Form.Label className="text-uppercase text-secondary small">Data di rilascio</Form.Label>
                    <Form.Control
                        type="date"
                        value={game.releaseDate}
                        onChange={(e) => handleChange("releaseDate", e.target.value)}
                        className="bg-black text-white border-secondary form-control-custom"
                    />
                    {errors.releaseDate && <div className="text-danger small mt-1">{errors.releaseDate}</div>}
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

                {/* Company */}
                <Form.Group className="mb-4">
                    <Form.Label className="text-uppercase text-secondary small">Azienda</Form.Label>
                    <Form.Select
                        value={game.companyId}
                        onChange={(e) => handleChange("companyId", e.target.value)}
                        className="bg-black text-white border-secondary form-control-custom"
                    >
                        <option value="">-- Seleziona un'azienda --</option>
                        {companies.length > 0 &&
                            companies.map((company) => (
                                <option key={company.id} value={company.id}>
                                    {company.name}
                                </option>
                            ))
                        }
                    </Form.Select>
                    {errors.companyId && <div className="text-danger small mt-1">{errors.companyId}</div>}
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
                        {game.categoriesId.map((catId, index) => {
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
                <button type="submit" className="custom-button">Aggiungi gioco</button>
            </Form>
        </Container>
    );
}

export default AddGame;
