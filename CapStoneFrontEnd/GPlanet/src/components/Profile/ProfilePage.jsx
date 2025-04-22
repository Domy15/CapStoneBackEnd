/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { getProfile } from "../../redux/actions/account";
import { fetchLibrary } from "../../redux/actions/library";
import { fetchWishlist } from "../../redux/actions/wishlist";
import { Person } from "react-bootstrap-icons";
import ProfileSection from "./ProfileSection";
import GameSectionProfile from "./GameSectionProfile";
import { useSelector } from "react-redux";

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [library, setLibrary] = useState([]);
    const [wishList, setWishList] = useState([]);
    const update = useSelector(state => state.update);

    const checkLibrary = async (userName) => {
        try {
            const data = await fetchLibrary(userName);
            setLibrary(data.library);
        } catch (error) {
            console.error(error);
        }
    };

    const loadWishlist = async (userName) => {
        try {
            const data = await fetchWishlist(userName);
            setWishList(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchProfile = async () => {
        try {
            const data = await getProfile();
            setProfile(data.profile);
            checkLibrary(data.profile.userName);
            loadWishlist(data.profile.userName);
        } catch (error) {
            console.error("Errore nel caricamento del profilo:", error);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [update])

    return (
        <Container className="text-white py-4 margin-top-library vh-100 animated-gradient">
            {profile && <ProfileSection profile={profile} />}
            {library && wishList && <GameSectionProfile library={library} wishList={wishList} />}
        </Container>
    );
};

export default ProfilePage;