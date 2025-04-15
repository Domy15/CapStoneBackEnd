import { useEffect, useState } from "react";
import Carousel from "./Carousel";
import { Container } from "react-bootstrap";
import MiniCarousel from "./MiniCarousel";

const HomePage = () => {
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

    const actionGames = games.filter(g => g.categories.some(c => c.name === "Action")).slice(0, 15);
    const owGames = games.filter(g => g.categories.some(c => c.name === "Open World")).slice(0, 15);

    const GRankGames = games.filter(g => G_Collection.includes(g.title));
        

    useEffect(() => {
        getGames();
    }, []);
    return (
        <Container>
            <Carousel games={sortedGames} />
            <h5 className="text-white mt-5">Giochi nella categoria GDR</h5>
            <MiniCarousel games={actionGames}/>
            <h5 className="text-white mt-5"><span className="text-success">G-Rank</span> Collection</h5>
            <MiniCarousel games={GRankGames}/>
            <h5 className="text-white mt-5">Giochi nella categoria Open World</h5>
            <MiniCarousel games={owGames}/>
        </Container>
    );
}

export default HomePage;