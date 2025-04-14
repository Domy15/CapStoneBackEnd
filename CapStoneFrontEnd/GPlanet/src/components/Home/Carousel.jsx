import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";

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
                    <div key={index}>
                        <div
                            className="position-relative"
                            style={{
                                height: "400px",
                                borderRadius: "10px",
                                overflow: "hidden",
                                boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
                            }}
                        >
                            <img
                                src={game.coverLarge}
                                alt={game.title}
                                className="w-100 h-100 object-fit-cover"
                            />
                            <div className="position-absolute bottom-0 start-0 w-100 p-3 bg-dark bg-opacity-50 text-light">
                                <h4 className="m-0">{game.title}</h4>
                                <small>{game.price > 0 ? `${game.price}€` : "free-to-play"}</small>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;
