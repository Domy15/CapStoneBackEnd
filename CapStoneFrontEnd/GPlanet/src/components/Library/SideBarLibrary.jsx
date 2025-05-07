import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { Dash, PlusLg } from "react-bootstrap-icons";

const SideBarLibrary = ({ library, setSelectedGame, isLoading }) => {
    const [show, setShow] = useState(true);

    return (

        <aside className="library-sidebar d-none d-xl-block">
            {!isLoading ?
                <>
                    <h5 className="sidebar-title d-flex align-items-center">
                        {show
                            ? <Dash className="me-2" style={{ cursor: "pointer" }} onClick={() => setShow(false)} />
                            : <PlusLg className="me-2" style={{ cursor: "pointer" }} onClick={() => setShow(true)} />
                        }
                        GIOCHI ({library.length})
                    </h5>

                    {show && <ul className={`game-list transition-list`}>
                        {library.map((game, i) => (
                            <li key={i} className="game-item" onClick={() => setSelectedGame(game)}>
                                <img src={game.cover.startsWith("http") ? game.cover : `https://localhost:7227/${game.cover}`} alt={game.title} className="game-thumbnail" />
                                <span className="game-title">{game.title}</span>
                            </li>
                        ))}
                    </ul>}
                </> : <div className="text-center mt-5"><Spinner animation="border" variant="success" /></div>}
        </aside>
    );
}

export default SideBarLibrary;