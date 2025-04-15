import { useEffect, useState } from "react";
import Carousel from "./Carousel";
import { Alert, Container, Spinner } from "react-bootstrap";
import MiniCarousel from "./MiniCarousel";

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [games, setGames] = useState([]);
    const gamesURL = "https://localhost:7227/api/Game";
    const G_Collection = [
        "Monster Hunter Wilds",
        "Fallout 3",
        "Bloodborne",
        "The Witcher 3: Wild Hunt",
        "Monster Hunter World",
        "The Elder Scrolls V: Skyrim",
        "Elden Ring",
        "Minecraft"
    ]

    const getGames = async () => {
        try {
            const response = await fetch(gamesURL, {
                method: 'GET'
            })
            if (response.ok) {
                const data = await response.json()
                console.log(data.games);
                setGames(data.games);
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

            <h5 className="text-white mt-5">Giochi nella categoria GDR</h5>
            {isLoading && <div className="text-center mt-5"><Spinner animation="border" variant="success" /></div>}
            {!isLoading && !isError && <MiniCarousel games={actionGames}/>}
            {!isLoading && isError && <Alert className="mt-5" variant={"danger"}>Errore durante il recupero dei dati! Riprova più tardi.</Alert>}

            <h5 className="text-white mt-5"><span className="text-success">G-Rank</span> Collection</h5>
            {isLoading && <div className="text-center mt-5"><Spinner animation="border" variant="success" /></div>}
            {!isLoading && !isError && <MiniCarousel games={GRankGames}/>}
            {!isLoading && isError && <Alert className="mt-5" variant={"danger"}>Errore durante il recupero dei dati! Riprova più tardi.</Alert>}

            <h5 className="text-white mt-5">Giochi nella categoria Open World</h5>
            {isLoading && <div className="text-center mt-5"><Spinner animation="border" variant="success" /></div>}
            {!isLoading && !isError && <MiniCarousel games={owGames}/>}
            {!isLoading && isError && <Alert className="mt-5" variant={"danger"}>Errore durante il recupero dei dati! Riprova più tardi.</Alert>}
        </Container>
    );
}

export default HomePage;