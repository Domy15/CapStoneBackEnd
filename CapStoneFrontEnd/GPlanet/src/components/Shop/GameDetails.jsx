/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Badge, Col, Image, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

const GameDetails = () => {
    const { id } = useParams();
    const [game, setGame] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [mainImage, setMainImage] = useState("");

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("it-IT", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    };

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
        <>
            {loading ? (
                <div className="text-center mt-5">
                    <Spinner animation="border" variant="success" />
                </div>
            ) : error ? (
                <div className="text-danger text-center mt-5">
                    <p>Errore durante il recupero dei dati!</p>
                </div>
            ) : game &&
            <Row>
                <Col md={7}>
                    <img
                        src={mainImage}
                        className="img-fluid rounded w-100"
                        style={{ height: "25em" }}
                    />
                    {game.extraImages?.length > 0 &&
                        <div className="d-flex gap-2 flex-wrap">
                            {game.extraImages.map((img, index) => {
                                const fullUrl = img.image.startsWith("http") ? img.image : `https://localhost:7227/${img.image}`;
                                return (
                                    <Image
                                        key={index}
                                        src={fullUrl}
                                        alt={`extra-${index}`}
                                        style={{ width: 100, height: 60, objectFit: "cover", cursor: "pointer", border: "none" }}
                                        onMouseEnter={() => setMainImage(fullUrl)}
                                        onMouseLeave={() =>
                                            setMainImage(
                                                game.coverLarge.startsWith("http")
                                                    ? game.coverLarge
                                                    : `https://localhost:7227/${game.coverLarge}`
                                            )
                                        }
                                    />
                                );
                            })}
                        </div>
                    }
                </Col>

                <Col md={5}>
                    <h2 className="mb-3">{game.title}</h2>
                    <p>{game.description || "Descrizione non disponibile."}</p>

                    <div className="mb-2">
                        <span className="text-secondary">DATA DI RILASCIO: </span>
                        {formatDate(game.releaseDate)}
                    </div>

                    <div className="mb-2">
                        <span className="text-secondary">PREZZO: </span>
                        {game.price > 0 ? `${game.price} €` : "Free-to-Play"}
                    </div>

                    {game.company && (
                        <div className="mb-2">
                            <span className="text-secondary">SVILUPPATORE: </span>{game.company}
                        </div>
                    )}

                    {game.categories?.length > 0 && (
                        <div className="mt-3">
                            {game.categories.map((cat, index) => (
                                <Badge key={index} bg="info" className="me-2">
                                    {cat.name}
                                </Badge>
                            ))}
                        </div>
                    )}
                </Col>
            </Row>}
        </>
    );
}

export default GameDetails;