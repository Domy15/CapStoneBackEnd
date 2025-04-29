import { Col, Image, Row } from "react-bootstrap";
import { AspectRatio } from "react-bootstrap-icons";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";

const ProfileSection = ({ profile, isLoading }) => {
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("it-IT", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    };

    return (
        <Row className="align-items-center mb-4">
            <Col xs={3} md={2}>
                {!isLoading ? <Image
                    src={
                        profile.imageProfile
                            ? `https://localhost:7227/${profile.imageProfile}`
                            : "https://sdmntpritalynorth.oaiusercontent.com/files/00000000-1778-6246-b593-32c3ea8d9707/raw?se=2025-04-22T12%3A39%3A20Z&sp=r&sv=2024-08-04&sr=b&scid=df085146-a50b-5979-b31e-5296d4f5e8f0&skoid=59d06260-d7df-416c-92f4-051f0b47c607&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-22T05%3A32%3A04Z&ske=2025-04-23T05%3A32%3A04Z&sks=b&skv=2024-08-04&sig=itbxPBU55Qn2Ku%2Bi9/TPQnjegoPTrToPSs9cJOfvNnI%3D"
                    }
                    roundedCircle
                    className="img-thumbnail border border-primary bg-dark"
                /> : <Skeleton circle={true} baseColor="#282B2E" highlightColor="#2F3234" width="100%" height="auto" style={{ aspectRatio: "1 / 1" }} className="img-thumbnail border border-primary bg-dark" />}
            </Col>
            <Col>
                {!isLoading ? <h1 className="text-white">{profile.userName}</h1> : <Skeleton baseColor="#282B2E" highlightColor="#2F3234" width="8em" height="2.5em" />}
                {!isLoading ? <p className="text-white">{profile.firstName} <small className="text-white opacity-75">{formatDate(profile.birthDate)}</small></p> : <Skeleton baseColor="#282B2E" highlightColor="#2F3234" width="12em" height="0.8em" />}
                <button className="button-profile" onClick={() => navigate("/profile/settings")}>Modifica profilo</button>
            </Col>
        </Row>
    );
}

export default ProfileSection;