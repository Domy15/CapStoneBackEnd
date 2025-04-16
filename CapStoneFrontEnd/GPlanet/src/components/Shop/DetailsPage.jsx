/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from "react-bootstrap";
import GameDetails from "./GameDetails";
import ButtonsWishlistDetails from "./ButtonsWishlistDetails";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PurchaseBox from "./PurchaseBox";

const DetailsPage = () => {
    const { id } = useParams();
    const [game, setGame] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [mainImage, setMainImage] = useState("");

    const getGame = async () => {
        try {
            const response = await fetch("https://localhost:7227/api/Game/" + id);
            if (response.ok) {
                const data = await response.json();
                setGame(data.game);
                setMainImage(
                    data.game.coverLarge.startsWith("http")
                        ? data.game.coverLarge
                        : `https://localhost:7227/${data.game.coverLarge}`
                );
                setLoading(false);
                setError(false);
            }
            else {
                setLoading(false);
                setError(true);
                throw new Error("Errore nel recupero dei dati!");
            }
        }
        catch (error) {
            console.log(error);
            setLoading(false);
            setError(true);
        }
    }

    useEffect(() => {
        getGame();
    }, [id])
    return (
        <Container className="text-white mt-4">
            <GameDetails game={game} loading={loading} error={error} mainImage={mainImage} setMainImage={setMainImage} />
            <ButtonsWishlistDetails />
            {game && <PurchaseBox game={game} />}
        </Container>
    );
}

export default DetailsPage;