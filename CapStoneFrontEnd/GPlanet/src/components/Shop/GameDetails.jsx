import { Badge, Col, Image, Row, Spinner } from "react-bootstrap";

const GameDetails = ({ game, loading, error, mainImage, setMainImage }) => {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("it-IT", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    };

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
                                        onClick={() => setMainImage(fullUrl)}
                                    />
                                );
                            })}
                        </div>
                    }
                </Col>

                <Col md={5}>
                    <Image
                        src={game.coverLarge.startsWith("http") ? game.coverLarge : `https://localhost:7227/${game.coverLarge}`}
                        style={{ width: "100%", height: "10em", objectFit: "cover", border: "none" }}
                        className="mt-3 mt-md-0"
                    />
                    <h2 className="my-3">{game.title}</h2>
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