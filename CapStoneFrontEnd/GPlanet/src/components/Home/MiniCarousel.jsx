import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import MiniCarouselCard from "./MiniCarouselCard";

const MiniCarousel = ({ games }) => {

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
                breakpoint: 993,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 577,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    arrows: false
                },
            }
        ],
    };

    return (
        <Slider {...settings}>
            {games.map((game, index) => (
                <MiniCarouselCard game={game} index={index} />
            ))}
        </Slider>
    );
}

export default MiniCarousel;