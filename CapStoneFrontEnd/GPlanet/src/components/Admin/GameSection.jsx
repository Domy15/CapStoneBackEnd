import { useEffect, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { fetchGames } from "../../redux/actions/games";
import { useNavigate } from "react-router-dom";
import GamesTable from "./GamesTable";
import { useSelector } from "react-redux";

const GameSection = () => {
    const [gamesData, setGamesData] = useState([]);
    const [sliceGame, setSliceGame] = useState(9);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const update = useSelector(state => state.update);

    const getGames = async () => {
        const { games, error } = await fetchGames();

        if (!error) {
            const sortedGames = games.sort((a, b) => a.title.localeCompare(b.title));
            setGamesData(sortedGames);
        }
    };

    const gamesFiltered = gamesData.filter(game =>
        game.title.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        getGames();
    }, [update])
    return (
        <div>
            <h2 className="text-white">Gestione Giochi</h2>
            <div className="p-3 rounded row justify-content-between my-4" style={{ backgroundColor: "#212529" }}>
                <Form className="d-flex search-form col-6">
                    <FormControl
                        value={search}
                        onChange={(e) => (setSearch(e.target.value))}
                        type="search"
                        placeholder="Cerca"
                        className="text-light custom-search-admin"
                    />
                </Form>
                <button className="custom-button col-2" onClick={() => navigate("/admin/addGame")}>Aggiungi nuovo gioco</button>
            </div>
            {gamesFiltered.length > 0 && <GamesTable games={gamesFiltered} sliceNumber={sliceGame} />}
            {sliceGame < gamesFiltered.length ?
                (<button className="custom-button" onClick={() => setSliceGame(gamesFiltered.length)}>Mostra tutti</button>) :
                (search === "" && <button className="custom-button" onClick={() => setSliceGame(9)}>Mostra meno</button>)
            }
        </div>
    );
}

export default GameSection;