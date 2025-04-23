/* eslint-disable react-hooks/exhaustive-deps */
// src/components/GamesList.js
import { useEffect, useState } from "react";
import { Container, Form, Spinner } from "react-bootstrap";
import { XLg } from "react-bootstrap-icons";
import { useLocation, useNavigate } from "react-router-dom";
import CustomRangeSlider from "./CustomRangeSlider";
import GameTable from "./GameTable";
import { fetchGames } from "../../redux/actions/games";

const GamesList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [allGames, setAllGames] = useState([]);
    const [games, setGames] = useState([]);
    const [sortOption, setSortOption] = useState("");
    const [maxPrice, setMaxPrice] = useState(150);
    const location = useLocation();
    const navigate = useNavigate();
    const category = location.state?.category;
    const search = location.state?.search;

    const getGames = async () => {
        setIsLoading(true);
        const { games, error } = await fetchGames();

        if (!error) {
            setAllGames(games);
            setIsLoading(false);
            setIsError(false);
        } else {
            setIsLoading(false);
            setIsError(true);
        }
    };

    const filterGames = () => {
        let filtered = [...allGames];

        if (category) {
            filtered = filtered.filter(game =>
                game.categories.some(c => c.name.toLowerCase() === category.toLowerCase())
            );
        }

        if (search) {
            filtered = filtered.filter(game =>
                game.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        filtered = filtered.filter(game => game.price <= maxPrice);

        switch (sortOption) {
            case "asc":
                filtered.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
                break;
            case "desc":
                filtered.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
                break;
            case "high":
                filtered.sort((a, b) => b.price - a.price);
                break;
            case "low":
                filtered.sort((a, b) => a.price - b.price);
                break;
            case "A":
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case "Z":
                filtered.sort((a, b) => b.title.localeCompare(a.title));
                break;
            default:
                break;
        }

        setGames(filtered);
    };

    useEffect(() => {
        getGames();
    }, []);

    useEffect(() => {
        filterGames();
    }, [allGames, category, search, maxPrice, sortOption]);

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
                    <option className="text-white" value="A">A-Z</option>
                    <option className="text-white" value="Z">Z-A</option>
                    <option className="text-white" value="asc">Data di rilascio (crescente)</option>
                    <option className="text-white" value="desc">Data di rilascio (decrescente)</option>
                    <option className="text-white" value="high">Prezzo più alto</option>
                    <option className="text-white" value="low">Prezzo più basso</option>
                </Form.Select>
            </div>
            {isLoading ? (
                <div className="text-center mt-5">
                    <Spinner animation="border" variant="success" />
                </div>
            ) : isError ? (
                <div className="text-danger text-center mt-5">
                    <p>Errore durante il recupero dei dati!</p>
                </div>
            ) : games.length > 0 ? (
                <GameTable games={games} />
            ) : (
                <div className="text-danger text-center mt-5">
                    <p>Nessun gioco trovato!</p>
                </div>
            )}
        </Container>
    );
};

export default GamesList;