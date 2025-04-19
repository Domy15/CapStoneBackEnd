/* eslint-disable react-hooks/exhaustive-deps */
// src/components/DetailsPage.js
import { Container } from "react-bootstrap";
import GameDetails from "./GameDetails";
import ButtonsWishlistDetails from "./ButtonsWishlistDetails";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PurchaseBox from "./PurchaseBox";
import CommentSection from "./CommentSection";
import { fetchGame } from "../../redux/actions/games";

const DetailsPage = () => {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [mainImage, setMainImage] = useState("");

    const getMainImage = (coverLarge) => {
        return coverLarge.startsWith("http")
            ? coverLarge
            : `https://localhost:7227/${coverLarge}`;
    };

    const getGame = async () => {
        setLoading(true);
        const { game, error } = await fetchGame(id);

        if (!error) {
            setGame(game);
            const image = getMainImage(game.coverLarge);
            setMainImage(image);
            setLoading(false);
            setError(false);
        } else {
            setLoading(false);
            setError(true);
        }
    };

    useEffect(() => {
        getGame();
    }, [id]);

    return (
        <Container className="text-white mt-4">
            <GameDetails game={game} loading={loading} error={error} mainImage={mainImage} setMainImage={setMainImage} />
            {!loading && !error && (
                <ButtonsWishlistDetails />
            )}
            {!loading && !error && game && (
                <PurchaseBox game={game} />
            )}
            {!loading && !error && (
                <CommentSection />
            )}
        </Container>
    );
};

export default DetailsPage;