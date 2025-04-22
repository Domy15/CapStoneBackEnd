import { Card, Col, Image, Row } from "react-bootstrap";

const GameSectionProfile = ({ library, wishList }) => {

    const sortedGames = [...library]
        .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
        .slice(0, 4);

    return (
        <>
            <Card bg="dark" text="white" className="mb-4">
                <Card.Header>Collezionista di giochi</Card.Header>
                <Card.Body>
                    <Row className="text-center">
                        <Col><h3>{library.length}</h3><p>Giochi posseduti</p></Col>
                        <Col><h3>{wishList.length}</h3><p>Lista dei desideri</p></Col>
                    </Row>
                </Card.Body>
            </Card>

            <Card bg="dark" text="white" className="mb-4">
                <Card.Header>Giochi in evidenza</Card.Header>
                <Card.Body>
                    <Row className="g-2">
                        {sortedGames.map((game, i) => (
                            <Col sm={6} lg={3} key={i}>
                                <Image src={game.cover.startsWith("http") ? game.coverLarge : `https://localhost:7227/${game.coverLarge}`} style={{ height: "13em", width: "100%" }} />
                            </Col>
                        ))}
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
}

export default GameSectionProfile;