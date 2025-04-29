import { Card, Col, Image, Row } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

const GameSectionProfile = ({ library, wishList, isLoading }) => {

    const sortedGames = [...library]
        .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
        .slice(0, 4);

    return (
        <>
            <Card bg="dark" text="white" className="mb-4">
                <Card.Header>Collezionista di giochi</Card.Header>
                <Card.Body>
                    <Row className="text-center">
                        <Col>{!isLoading ? <><h3>{library.length}</h3><p>Giochi posseduti</p></> : <Skeleton baseColor="#282B2E" highlightColor="#2F3234" width="4em" height="2em" count={2} />}</Col>
                        <Col>{!isLoading ? <><h3>{wishList.length}</h3><p>Lista dei desideri</p></> : <Skeleton baseColor="#282B2E" highlightColor="#2F3234" width="4em" height="2em" count={2} />}</Col>
                    </Row>
                </Card.Body>
            </Card>

            <Card bg="dark" text="white" className="mb-4">
                <Card.Header>Giochi in evidenza</Card.Header>
                <Card.Body>
                    <Row className="g-2">
                        {sortedGames.map((game, i) => (
                            <Col sm={6} lg={3} key={i}>
                                {!isLoading ? <Image src={game.cover.startsWith("http") ? game.coverLarge : `https://localhost:7227/${game.coverLarge}`} style={{ height: "13em", width: "100%" }} />
                                    : <Skeleton baseColor="#282B2E" highlightColor="#2F3234" width="100%" height="13em" />}
                            </Col>
                        ))}
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
}

export default GameSectionProfile;