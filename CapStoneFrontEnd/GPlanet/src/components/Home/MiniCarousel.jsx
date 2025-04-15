import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const MiniCarousel = ({ games }) => {
    const navigate = useNavigate();

    const arrowStyle = {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 2,
        cursor: "pointer",
        padding: "0.5rem",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        borderRadius: "50%",
    };

    const PrevArrow = ({ onClick }) => (
        <div
            style={{ ...arrowStyle, left: "-50px" }}
            onClick={onClick}
        >
            <ChevronLeft size={32} color="white" />
        </div>
    );

    const NextArrow = ({ onClick }) => (
        <div
            style={{ ...arrowStyle, right: "-30px" }}
            onClick={onClick}
        >
            <ChevronRight size={32} color="white" />
        </div>
    );

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        swipeToSlide: true,
        autoplay: false,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <Slider {...settings}>
            {games.map((game, index) => (
                <div key={index}>
                    <div
                        onClick={() => navigate(`/game/${game.id}`)}
                        style={{
                            padding: "0.5rem",
                            cursor: "pointer"
                        }}
                    >
                        <img
                            src={game.cover.startsWith('http') ? game.cover : `https://localhost:7227/${game.cover}`}
                            alt={game.title}
                            style={{
                                width: "18em",
                                height: "18em",
                                borderRadius: "1em",
                                objectFit: "cover",
                                marginBottom: "0.5rem",
                            }}
                        />
                        <p className="text-light mb-1" style={{ fontSize: "0.9rem" }}>{game.title}</p>
                        <p className="text-success mb-0" style={{ fontWeight: "bold" }}>{game.price > 0 ? `${game.price}€` : "Free-to-Play"}</p>
                    </div>
                </div>
            ))}
        </Slider>
    );
}

export default MiniCarousel;