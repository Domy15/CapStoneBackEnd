import { Container } from 'react-bootstrap';
import { Facebook, Twitter, Google, Instagram, Linkedin, Github } from 'react-bootstrap-icons';
import { useLocation, useMatch } from 'react-router-dom';

const Footer = () => {
    const { pathname } = useLocation();
    const isGameDetail = useMatch("/game/:id");
    const isVisible = ["/", "/games"].includes(pathname) || isGameDetail;


    const iconStyle = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        border: '2px solid white',
        borderRadius: '50%',
        margin: '0 8px',
        color: 'white',
        fontSize: '18px',
        transition: '0.3s ease',
    };

    return (
        <>
            {isVisible && <footer className="text-center text-white mt-5">
                <hr />
                <Container className="py-4">
                    <div className="mb-3">
                        <a href="#!" style={iconStyle}><Facebook /></a>
                        <a href="#!" style={iconStyle}><Twitter /></a>
                        <a href="#!" style={iconStyle}><Google /></a>
                        <a href="#!" style={iconStyle}><Instagram /></a>
                        <a href="#!" style={iconStyle}><Linkedin /></a>
                        <a href="https://github.com/Domy15?tab=repositories" target='blank' style={iconStyle}><Github /></a>
                    </div>
                    <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }} className="py-2 mt-5">
                        © 2024 Copyright: <a className="text-white" href="/"> G-Planet.com </a>
                    </div>
                </Container>
            </footer>}
        </>
    );
}

export default Footer;