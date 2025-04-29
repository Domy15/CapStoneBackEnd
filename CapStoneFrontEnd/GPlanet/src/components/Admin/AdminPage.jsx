import { Col, Container, Row } from "react-bootstrap";
import GameSection from "./GameSection";
import { useState } from "react";
import CategorySection from "./CategorySection";


const AdminPage = () => {
    const [nav, setNav] = useState(1);

    return (
        <div className="margin-top-custom mb-5 mx-auto" style={{ width: "80%" }}>
            <Row>
                <Col md={2} className="sidebar">
                    <ul className="list-unstyled">
                        <li className={`mb-2 text-white p-1 rounded ${nav === 1 ? "bg-secondary" : "opacity-50"}`} onClick={() => setNav(1)} style={{ cursor: "pointer" }}>Giochi</li>
                        <li className={`mb-2 text-white p-1 rounded ${nav === 2 ? "bg-secondary" : "opacity-50"}`} onClick={() => setNav(2)} style={{ cursor: "pointer" }}>Categorie</li>
                        <li className={`mb-2 text-white p-1 rounded ${nav === 3 ? "bg-secondary" : "opacity-50"}`} onClick={() => setNav(3)} style={{ cursor: "pointer" }}>Compagnie</li>
                    </ul>
                </Col>
                <Col md={10} className="main-content">
                    {nav === 1 && <GameSection />}
                    {nav === 2 && <CategorySection />}
                    {nav === 3 && <h2 className="text-white">Compagnie</h2>}
                </Col>
            </Row>
        </div>
    );
}

export default AdminPage;