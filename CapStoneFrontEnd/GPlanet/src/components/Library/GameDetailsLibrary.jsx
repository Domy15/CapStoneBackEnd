import { Image } from "react-bootstrap";
import { Download } from "react-bootstrap-icons";

const GameDetailsLibrary = ({ game }) => {
    return (
        <div className="game-details-container text-light">

            <div className="game-cover-section">
                <Image
                    src={game.coverLarge.startsWith("http") ? game.coverLarge : `https://localhost:7227/${game.coverLarge}`}
                    className="cover-details-library"
                />
            </div>

            <div className="p-4 h-100">
                <div className="d-flex gap-3 align-items-center">
                    <button className="custom-button fs-6 d-flex align-items-center justify-content-center" style={{width: "10em", height: "3em"}}><Download className="me-2"/> Installa</button>
                    <p className="text-white h2">Installa {game.title}</p>
                </div>
            </div>
        </div>
    );
};

export default GameDetailsLibrary;
