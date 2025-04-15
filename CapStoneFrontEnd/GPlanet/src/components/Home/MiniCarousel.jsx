import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MiniCarousel = ({ games }) => {

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        swipeToSlide: true,
        autoplay: false,
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
                        style={{
                            padding: "0.5rem"
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