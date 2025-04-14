import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import { Col, Row } from "react-bootstrap";

const Carousel = ({ games }) => {
    const PrevArrow = ({ onClick }) => (
        <div
            className="position-absolute top-50 start-0 translate-middle-y z-3"
            style={{ cursor: "pointer", padding: "10px" }}
            onClick={onClick}
        >
            <ChevronLeft size={32} color="white" />
        </div>
    );

    const NextArrow = ({ onClick }) => (
        <div
            className="position-absolute top-50 end-0 translate-middle-y z-3"
            style={{ cursor: "pointer", padding: "10px" }}
            onClick={onClick}
        >
            <ChevronRight size={32} color="white" />
        </div>
    );


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
    };

    return (
        <div className="my-4 container">
            <Slider {...settings} className="custom-slick-dots">
                {games.map((game, index) => (
                    <div
                        key={index}
                        className="d-flex align-items-stretch mb-4"
                        style={{
                            height: "400px",
                            borderRadius: "12px",
                            overflow: "hidden",
                            background: "#111",
                            boxShadow: "8px 0 30px rgba(0,0,0,0.4)"
                        }}
                    >
                        <div className="w-75">
                            <img
                                src={game.coverLarge.startsWith('http') ? game.coverLarge : `https://localhost:7227/${game.coverLarge}`}
                                alt={game.title}
                                className="w-100 h-100 object-fit-cover"
                            />
                        </div>
                        <div
                            className="w-25 text-light d-flex flex-column justify-content-between p-4"
                            style={{
                                background: "linear-gradient(to top right, #0e0e0e, #1a1a1a)"
                            }}
                        >
                            <div>
                                <h3>{game.title}</h3>
                                {game.extraImages &&
                                    <Row>
                                        {game.extraImages.slice(0, 4).map((image, i) => (
                                            <Col xs={6} key={i} className="mb-3"><img src={image.image.startsWith('http') ? image.image : `https://localhost:7227/${image.image}`} style={{width: "140px"}} /></Col>
                                        ))}
                                    </Row>}
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
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;
