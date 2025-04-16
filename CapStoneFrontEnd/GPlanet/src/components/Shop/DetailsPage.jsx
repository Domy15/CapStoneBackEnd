import { Container } from "react-bootstrap";
import GameDetails from "./GameDetails";
import ButtonsWishlistDetails from "./ButtonsWishlistDetails";

const DetailsPage = () => {

    

    return (
        <Container className="text-white mt-4">
            <GameDetails />
            <ButtonsWishlistDetails />
        </Container>
    );
}

export default DetailsPage;