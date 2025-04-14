/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Carousel from "./Carousel";

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
    return (<Carousel games={sortedGames} />);
}

export default HomePage;