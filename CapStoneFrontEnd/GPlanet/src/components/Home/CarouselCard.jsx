import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CarouselCard = ({ game, index }) => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 577);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 577);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const mainImage = isMobile ? game.cover : game.coverLarge;
    const imageUrl = mainImage.startsWith("http") ? mainImage : `https://localhost:7227/${mainImage}`;

    return (
        <div
            key={index}
            className="d-flex flex-column flex-md-row mb-4"
            style={{ cursor: "pointer" }}
        >
            <div
                className="w-100 w-md-75"
                onClick={() => navigate(`/game/${game.id}`)}
            >
                <img
                    src={imageUrl}
                    alt={game.title}
                    className="w-100 object-fit-cover"
                    style={{ height: "35em" }}
                />
            </div>
            <div
                className="w-md-25 text-light d-flex flex-column justify-content-between p-4 mt-3 mt-md-0"
                style={{
                    background: "linear-gradient(to top right, #0e0e0e, #1a1a1a)"
                }}
            >
                <div>
                    <h3>{game.title}</h3>
                    {game.extraImages &&
                        <Row>
                            {game.extraImages.slice(0, 4).map((image, i) => (
                                <Col xs={6} sm={3} key={i} className="mb-3">
                                    <img
                                        src={image.image.startsWith("http") ? image.image : `https://localhost:7227/${image.image}`}
                                        style={{
                                            width: "5em",
                                            height: "3em"
                                        }}
                                        alt={`Extra Image ${i}`}
                                    />
                                </Col>
                            ))}
                        </Row>
                    }
                    <p className="mb-1">
                        <span className="text-success">Consigliato</span> se ti piacciono titoli con le etichette:
                    </p>
                    <div className="d-flex gap-2 flex-wrap">
                        {game.categories.map((category, i) => (
                            <span key={i} className="badge bg-secondary">{category.name}</span>
                        ))}
                    </div>
                </div>

                <div>
                    <span className="badge bg-success">
                        {game.price > 0 ? `${game.price}€` : "Free-to-Play"}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CarouselCard;
