import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AvatarSetting from "./AvatarSetting";
import { useSelector } from "react-redux";
import { getProfile } from "../../redux/actions/account";
import FormSetting from "./FormSetting";
import { toast } from "react-toastify";

const ProfileSettings = () => {
    const [nav, setNav] = useState(1);
    const navigate = useNavigate();
    const update = useSelector(state => state.update);
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProfile = async () => {
        setIsLoading(true);
        try {
            const data = await getProfile();
            setProfile(data.profile);
        } catch (error) {
            toast.error("Errore nel caricamento del profilo:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [update])
    return (
        <Container className="margin-top-custom">
            <div className="text-end">
                <a className="text-secondary ms-auto" style={{ cursor: "pointer" }} onClick={() => navigate("/profile")}>Torna al profilo</a>
            </div>
            <Row>
                <Col md={3}>
                    <ul className="list-unstyled">
                        <li className={`mb-2 text-white p-1 rounded ${nav === 1 ? "bg-secondary" : "opacity-50"}`} onClick={() => setNav(1)} style={{ cursor: "pointer" }}>Generali</li>
                        <li className={`mb-2 text-white p-1 rounded ${nav === 2 ? "bg-secondary" : "opacity-50"}`} onClick={() => setNav(2)} style={{ cursor: "pointer" }}>Avatar</li>
                    </ul>
                </Col>
                {nav === 1 && profile && <FormSetting profile={profile} />}
                {nav === 2 && profile && <AvatarSetting profile={profile} isLoadingProfile={isLoading} />}
            </Row>
        </Container>
    );
}

export default ProfileSettings;