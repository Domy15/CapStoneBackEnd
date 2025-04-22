import { useEffect, useRef, useState } from "react";
import { Download } from "react-bootstrap-icons";
import ColorThief from "colorthief";

const GameDetailsLibrary = ({ game }) => {
    const [gradientColor, setGradientColor] = useState(null);
    const imgRef = useRef();

    useEffect(() => {
        const imgElement = imgRef.current;

        if (!imgElement) return;

        const rgbToRgba = (r, g, b, a) => `rgba(${r}, ${g}, ${b}, ${a})`;

        const handleImageLoad = () => {
            try {
                const colorThief = new ColorThief();
                const result = colorThief.getColor(imgElement);
                if (result && result.length === 3) {
                    const rgba = rgbToRgba(result[0], result[1], result[2], 1);
                    setGradientColor(rgba);
                }
            } catch (err) {
                console.error("Color extraction failed", err);
            }
        };

        if (imgElement.complete) {
            handleImageLoad();
        } else {
            imgElement.addEventListener("load", handleImageLoad);
            return () => imgElement.removeEventListener("load", handleImageLoad);
        }
    }, [game.coverLarge]);

    const imageSrc = `https://localhost:7227/api/ImageProxy?url=${encodeURIComponent(
        game.coverLarge.startsWith("http")
            ? game.coverLarge
            : `https://localhost:7227/${game.coverLarge.replace(/\\/g, "/")}`
    )}`;

    return (
        <div className="game-details-container text-light" style={{ backgroundColor: "#212529" }}>
            <div className="game-cover-section">
                <img
                    ref={imgRef}
                    crossOrigin="anonymous"
                    src={imageSrc}
                    className="cover-details-library"
                    alt={`Cover di ${game.title}`}
                />
            </div>

            <div
                className="p-4"
                style={{
                    background: gradientColor
                        ? `linear-gradient(to bottom, ${gradientColor}0%, ${gradientColor} 10%, #212529 100%)`
                        : "#212529",
                    transition: "background 0.5s ease",
                    height: "10em"
                }}
            >
                <div className="d-flex gap-3 align-items-center">
                    <button className="custom-button fs-6 d-flex align-items-center justify-content-center" style={{ width: "10em", height: "3em" }}>
                        <Download className="me-2" /> Installa
                    </button>
                    <p className="text-white h2">Installa {game.title}</p>
                </div>
            </div>
        </div>
    );
};

export default GameDetailsLibrary;