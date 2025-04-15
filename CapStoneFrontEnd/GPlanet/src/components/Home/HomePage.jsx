import { useEffect, useState } from "react";
import Carousel from "./Carousel";
import { Container } from "react-bootstrap";

const HomePage = () => {
    const [games, setGames] = useState([]);
    const gamesURL = "https://localhost:7227/api/Game";

    const getGames = async () => {
        try {
            const response = await fetch(gamesURL, {
                method: 'GET'
            })
            if (response.ok) {
                const data = await response.json()
                console.log(data.games);
                setGames(data.games)
            }
            else {
                throw new Error("Errore!")
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    const sortedGames = [...games]
        .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
        .slice(0, 12);

    useEffect(() => {
        getGames();
    }, []);
    return (
        <Container>
            <Carousel games={sortedGames} />
        </Container>
    );
}

export default HomePage;