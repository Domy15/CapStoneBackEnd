/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { fetchLibrary } from "../../redux/actions/library";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import SideBarLibrary from "./SideBarLibrary";
import { Col, Image, Row } from "react-bootstrap";
import GameDetailsLibrary from "./GameDetailsLibrary";

const LibraryPage = () => {
    const update = useSelector(state => state.update);
    const [library, setLibrary] = useState([]);
    const { userName } = useParams();
    const [selectedGame, setSelectedGame] = useState(null);

    const checkLibrary = async () => {
        try {
            const data = await fetchLibrary(userName);
            setLibrary(data.library);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (userName) {
            checkLibrary();
        }
    }, [update])
    return (
        <div className="library-container margin-top-library">
            {library && <SideBarLibrary library={library} setSelectedGame={setSelectedGame} />}
            {!selectedGame ? (
                <main className="library-content">
                    <p className="fs-4">GIOCHI ({library.length})</p> <hr />
                    <Row className="justify-content-start">
                        {library && library.map((game, i) =>
                            <Col key={i} xs="auto" className="mb-3">
                                <Image src={game.cover.startsWith("http") ? game.cover : `https://localhost:7227/${game.cover}`} className="game-cover" onClick={() => setSelectedGame(game)} />
                            </Col>
                        )}
                    </Row>
                </main>) : (
                <GameDetailsLibrary game={selectedGame} setGame={setSelectedGame} />
            )}
        </div>
    );
}

export default LibraryPage;