/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleCardGame from "./SingleCardGame";
import { Container, Form, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";

const WishListPage = () => {
    const update = useSelector(state => state.update);
    const { userName } = useParams();
    const [wishList, setWishList] = useState([]);
    const [search, setSearch] = useState("");
    const wishListFiltered = wishList.filter(game => game.title.toLowerCase().includes(search.toLowerCase()));

    const getWishlist = async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await fetch(`https://localhost:7227/api/WishList/${userName}`, {
                headers: {
                    "Authorization": `Bearer ${token.token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setWishList(data.wishList);
            } else {
                throw new Error("Errore nel recupero dei dati!");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getWishlist();
    }, [update])
    return (
        <Container>
            <h1 className="text-white mt-3 mb-5">Lista desideri di {userName}</h1>
            <Form className="d-flex search-form">
                <FormControl
                    value={search}
                    onChange={(e) => (setSearch(e.target.value))}
                    type="search"
                    placeholder="Cerca per nome"
                    className="text-light custom-search-wishList"
                />
            </Form>
            <hr className="border border-1 border-black" />
            {wishListFiltered.length > 0 ? wishListFiltered.map((game, i) =>
                <SingleCardGame key={i} game={game} />
            ) : (
                <p className="text-white mt-3">Nessun gioco trovato.</p>
            )}
        </Container>
    );
}

export default WishListPage;