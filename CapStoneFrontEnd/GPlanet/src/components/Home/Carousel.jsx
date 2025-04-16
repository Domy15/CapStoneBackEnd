import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import CarouselCard from "./CarouselCard";

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
        <div className="my-4">
            <h4 className="text-white">ULTIME USCITE CONSIGLIATE</h4>
            <Slider {...settings} className="custom-slick-dots">
                {games.map((game, index) => (
                    <CarouselCard game={game} index={index} />
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;
