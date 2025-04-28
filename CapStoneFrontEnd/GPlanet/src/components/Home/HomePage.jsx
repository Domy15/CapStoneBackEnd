// src/components/HomePage.js
import { useEffect, useState } from "react";
import { Alert, Container, Spinner } from "react-bootstrap";
import Carousel from "./Carousel";
import MiniCarousel from "./MiniCarousel";
import { fetchGames } from "../../redux/actions/games";

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [games, setGames] = useState([]);

    const G_Collection = [
        "Monster Hunter Wilds",
        "Fallout 3",
        "Bloodborne",
        "The Witcher 3: Wild Hunt",
        "Monster Hunter World",
        "The Elder Scrolls V: Skyrim",
        "Elden Ring",
        "Minecraft"
    ];

    const getGames = async () => {
        setIsLoading(true);
        const { games, error } = await fetchGames();

        if (!error) {
            setGames(games);
            setIsLoading(false);
            setIsError(false);
        } else {
            setIsLoading(false);
            setIsError(true);
        }
    };

    const sortedGames = [...games]
        .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
        .slice(0, 12);

    const actionGames = games.filter(g => g.categories.some(c => c.name === "Action")).slice(0, 15);
    const owGames = games.filter(g => g.categories.some(c => c.name === "Open World")).slice(0, 15);

    const GRankGames = games.filter(g => G_Collection.includes(g.title));

    useEffect(() => {
        getGames();
    }, []);

    return (
        <Container>
            {isLoading && <div className="text-center mt-5"><Spinner animation="border" variant="success" /></div>}
            {!isLoading && !isError && <Carousel games={sortedGames} />}
            {!isLoading && isError && <Alert className="mt-5" variant={"danger"}>Errore durante il recupero dei dati! Riprova più tardi.</Alert>}

            <h5 className="text-white mt-5">Giochi nella categoria <span className="text-success">Action</span></h5>
            {isLoading && <div className="text-center mt-5"><Spinner animation="border" variant="success" /></div>}
            {!isLoading && !isError && <MiniCarousel games={actionGames} />}
            {!isLoading && isError && <Alert className="mt-5" variant={"danger"}>Errore durante il recupero dei dati! Riprova più tardi.</Alert>}

            <h5 className="text-white mt-5"><span className="text-success">G-Rank</span> Collection</h5>
            {isLoading && <div className="text-center mt-5"><Spinner animation="border" variant="success" /></div>}
            {!isLoading && !isError && <MiniCarousel games={GRankGames} />}
            {!isLoading && isError && <Alert className="mt-5" variant={"danger"}>Errore durante il recupero dei dati! Riprova più tardi.</Alert>}

            <h5 className="text-white mt-5">Giochi nella categoria <span className="text-success">Open World</span></h5>
            {isLoading && <div className="text-center mt-5"><Spinner animation="border" variant="success" /></div>}
            {!isLoading && !isError && <MiniCarousel games={owGames} />}
            {!isLoading && isError && <Alert className="mt-5" variant={"danger"}>Errore durante il recupero dei dati! Riprova più tardi.</Alert>}
        </Container>
    );
};

export default HomePage;