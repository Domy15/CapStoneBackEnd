/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Alert, Button, Container, Form, Image, Spinner, Table } from "react-bootstrap";
import { XLg } from "react-bootstrap-icons";
import { useLocation, useNavigate } from "react-router-dom";
import CustomRangeSlider from "./CustomRangeSlider";

const GamesList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [show, setShow] = useState(30);
    const [games, setGames] = useState([]);
    const [sortOption, setSortOption] = useState("");
    const [maxPrice, setMaxPrice] = useState(150);
    const location = useLocation();
    const navigate = useNavigate();
    const category = location.state?.category;
    const search = location.state?.search;
    const gamesURL = "https://localhost:7227/api/Game";

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("it-IT", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    };

    const getGames = async () => {
        try {
            const response = await fetch(gamesURL, {
                method: 'GET'
            })
            if (response.ok) {
                const data = await response.json()
                let filteredGames = [...data.games];

                switch (sortOption) {
                    case "asc":
                        filteredGames.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
                        break;
                    case "desc":
                        filteredGames.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
                        break;
                    case "high":
                        filteredGames.sort((a, b) => b.price - a.price);
                        break;
                    case "low":
                        filteredGames.sort((a, b) => a.price - b.price);
                        break;
                    default:
                        break;
                }

                filteredGames = filteredGames.filter(game => game.price <= maxPrice);

                if (category) {
                    filteredGames = filteredGames.filter(game =>
                        game.categories.some(c => c.name.toLowerCase() === category.toLowerCase())
                    );
                }

                if (search) {
                    filteredGames = filteredGames.filter(game =>
                        game.title.toLowerCase().includes(search.toLowerCase())
                    );
                }
                setGames(filteredGames);
                setIsLoading(false);
                setIsError(false);
            }
            else {
                setIsLoading(false);
                setIsError(true);
                throw new Error("Errore!")
            }
        }
        catch (error) {
            console.log(error);
            setIsLoading(false);
            setIsError(true);
        }
    }

    useEffect(() => {
        getGames();
    }, [category, search, sortOption, maxPrice]);

    return (
        <Container>
            <div className="d-flex gap-2 flex-wrap mb-3 mt-3">
                {category &&
                    <span className="filter-chip">
                        {`"${category}"`}
                        <XLg role="button" onClick={() => navigate("/games")} />
                    </span>
                }
                {search &&
                    <span className="filter-chip">
                        {`"${search}"`}
                        <XLg role="button" onClick={() => navigate("/games")} />
                    </span>
                }
            </div>
            {isLoading && <div className="text-center mt-5"><Spinner animation="border" variant="success" /></div>}
            {!isLoading && isError && <Alert className="mt-5" variant={"danger"}>Errore durante il recupero dei dati! Riprova più tardi.</Alert>}
            {!isLoading && !isError &&
                <>
                    <div className="d-flex justify-content-between align-items-center p-3" style={{ backgroundColor: "#212529" }}>
                        <div className="w-25 text-white">
                            <label htmlFor="priceRange" className="form-label">Prezzo massimo: {maxPrice}€</label>
                            <CustomRangeSlider
                                min={0}
                                max={150}
                                step={1}
                                value={maxPrice}
                                onChange={setMaxPrice}
                            />
                        </div>
                        <Form.Select
                            className="w-25"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            style={{ backgroundColor: "#0B2A23", color: "white", border: "1px solid #198754" }}>
                            <option className="text-white" value="">Filtra per...</option>
                            <option className="text-white" value="asc">Data di rilascio (crescente)</option>
                            <option className="text-white" value="desc">Data di rilascio (decrescente)</option>
                            <option className="text-white" value="high">Prezzo più alto</option>
                            <option className="text-white" value="low">Prezzo più basso</option>
                        </Form.Select>
                    </div>
                    <Table responsive hover variant="dark" className="mt-4">
                        <tbody>
                            {games.slice(0, show).map((game, index) => (
                                <tr key={index} style={{ verticalAlign: "middle", cursor: "pointer" }} onClick={() => navigate(`/game/${game.id}`)}>
                                    <td>
                                        <Image src={game.coverLarge.startsWith('http') ? game.coverLarge : `https://localhost:7227/${game.coverLarge}`} rounded style={{ width: 80, height: 40 }} />
                                    </td>
                                    <td>{game.title}</td>
                                    <td>{formatDate(game.releaseDate)}</td>
                                    <td>{game.price > 0 ? `${game.price}€` : "Free-to-Play"}</td>
                                </tr>
                            ))}
                        </tbody>
                        {games.length > show && <button variant={"success"} className="mt-3 custom-button" onClick={() => setShow(show + 30)}>Mostra altro</button>}
                    </Table>
                </>}
        </Container>
    );
}

export default GamesList;