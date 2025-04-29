import { Col, Row } from "react-bootstrap";
import GameSection from "./GameSection";
import { useEffect, useState } from "react";
import CategorySection from "./CategorySection";
import CompanySection from "./CompanySection";


const AdminPage = () => {
    const [nav, setNav] = useState(1);
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1200);

    const handleResize = () => {
        setIsLargeScreen(window.innerWidth >= 1200);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="margin-top-custom mb-5 mx-auto" style={{ width: "80%" }}>
            <Row>
                <Col xl={2} className={`${isLargeScreen ? "sidebar" : ""}`}>
                    <ul className="list-unstyled">
                        <li className={`mb-2 text-white p-1 rounded ${nav === 1 ? "bg-secondary" : "opacity-50"}`} onClick={() => setNav(1)} style={{ cursor: "pointer" }}>Giochi</li>
                        <li className={`mb-2 text-white p-1 rounded ${nav === 2 ? "bg-secondary" : "opacity-50"}`} onClick={() => setNav(2)} style={{ cursor: "pointer" }}>Categorie</li>
                        <li className={`mb-2 text-white p-1 rounded ${nav === 3 ? "bg-secondary" : "opacity-50"}`} onClick={() => setNav(3)} style={{ cursor: "pointer" }}>Compagnie</li>
                    </ul>
                </Col>
                <Col xl={10} className={`${isLargeScreen ? "main-content" : ""}`}>
                    {nav === 1 && <GameSection />}
                    {nav === 2 && <CategorySection />}
                    {nav === 3 && <CompanySection />}
                </Col>
            </Row>
        </div>
    );
}

export default AdminPage;