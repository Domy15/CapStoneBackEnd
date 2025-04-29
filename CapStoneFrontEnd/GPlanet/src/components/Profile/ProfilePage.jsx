import { useEffect, useState } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { getProfile } from "../../redux/actions/account";
import { fetchLibrary } from "../../redux/actions/library";
import { fetchWishlist } from "../../redux/actions/wishlist";
import { Person } from "react-bootstrap-icons";
import ProfileSection from "./ProfileSection";
import GameSectionProfile from "./GameSectionProfile";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [library, setLibrary] = useState([]);
    const [wishList, setWishList] = useState([]);
    const update = useSelector(state => state.update);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProfile = async () => {
        setIsLoading(true);
        try {
            const data = await getProfile();
            setProfile(data.profile);
            const [libraryData, wishListData] = await Promise.all([
                fetchLibrary(data.profile.userName),
                fetchWishlist(data.profile.userName)
            ]);

            setLibrary(libraryData.library);
            setWishList(wishListData);
        } catch (error) {
            toast.error("Errore nel caricamento del profilo: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [update])

    return (
        <Container className="text-white py-4 margin-top-library vh-100 animated-gradient">
            {profile && <ProfileSection profile={profile} isLoading={isLoading} />}
            {library && wishList && <GameSectionProfile library={library} wishList={wishList} isLoading={isLoading} />}
        </Container>
    );
};

export default ProfilePage;