/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { fetchLibrary } from "../../redux/actions/library";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import SideBarLibrary from "./SideBarLibrary";
import { Col, Image, Row } from "react-bootstrap";
import GameDetailsLibrary from "./GameDetailsLibrary";
import Skeleton from "react-loading-skeleton";

const LibraryPage = () => {
    const update = useSelector(state => state.update);
    const [library, setLibrary] = useState([]);
    const { userName } = useParams();
    const [selectedGame, setSelectedGame] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const checkLibrary = async () => {
        setIsLoading(true);
        try {
            const data = await fetchLibrary(userName);
            setLibrary(data.library);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (userName) {
            checkLibrary();
        }
    }, [update])
    return (
        <div className="library-container margin-top-library">
            {library && <SideBarLibrary library={library} setSelectedGame={setSelectedGame} isLoading={isLoading} />}
            {!selectedGame ? (
                <main className="library-content">
                    <p className="fs-4">GIOCHI ({library.length})</p> <hr />
                    <Row className="justify-content-start">
                        {library && !isLoading ? library.map((game, i) =>
                            <Col key={i} xs="auto" className="mb-3">
                                <Image src={game.cover.startsWith("http") ? game.cover : `https://localhost:7227/${game.cover}`} className="game-cover" onClick={() => setSelectedGame(game)} />
                            </Col>
                        ) :
                            Array.from({ length: 18 }).map((i) => (
                                <Col key={i} xs="auto" className="mb-3">
                                    <Skeleton width="14.5em" height="20em" baseColor="#282B2E" highlightColor="#2F3234" borderRadius="0.5rem" />
                                </Col>
                            ))}
                    </Row>
                </main>) : (
                <GameDetailsLibrary game={selectedGame} setGame={setSelectedGame} isLoading={isLoading} />
            )}
        </div>
    );
}

export default LibraryPage;