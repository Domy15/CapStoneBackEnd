/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Col, Container, Form, Image, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { addExtraImages, deleteExtraImages, fetchGame } from "../../redux/actions/games";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import ModalDelete from "./ModalDelete";
import { Trash } from "react-bootstrap-icons";

const AddExtraImages = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [error, setError] = useState("");
    const [game, setGame] = useState();
    const update = useSelector(state => state.update);
    const dispatch = useDispatch();
    const [modalShow, setModalShow] = useState(false);
    const [selectedId, setSelectedId] = useState("");

    const handleFileChange = (e) => {
        setSelectedFiles(e.target.files);
        setError("");
    }

    const getGame = async () => {
        const { game, error } = await fetchGame(id);

        if (!error) {
            setGame(game);
            console.log(game);
        } else {
            console.log("Errore durante il recupero dei dati!");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (selectedFiles.length === 0) {
            setError("Seleziona almeno un file.");
            return;
        }

        const formData = new FormData();
        Array.from(selectedFiles).forEach((file) => {
            formData.append("ExtraImages", file);
        });

        toast.promise(
            (async () => {
                const response = await addExtraImages(id, formData);
                if (!response.success) {
                    throw new Error(response.message);
                }
                return response.message;
            })(),
            {
                pending: "Caricamento in corso...",
                success: "Immagini caricate con successo!",
                error: "Si è verificato un errore durante il caricamento."
            }
        ).then(() => {
            dispatch({ type: "UPDATE" });
        });
    }

    const handleDelete = async () => {
        toast.promise(
            (async () => {
                const res = await deleteExtraImages(selectedId);
                if (!res.success) {
                    throw new Error(res.message);
                }
                return res.message;
            })(),
            {
                pending: "Caricamento in corso...",
                success: "Immagine eliminata con successo!",
                error: "Si è verificato un errore durante l'eliminazione."
            }
        ).then(() => {
            dispatch({ type: "UPDATE" });
        });
    };

    useEffect(() => {
        getGame();
    }, [id, update])
    return (
        <Container className="margin-top-custom">
            {game && <>
                <h3 className="mb-4 text-white">Seleziona le immagini da aggiungere!</h3>
                <Form onSubmit={handleSubmit} className="bg-dark p-4 rounded shadow">
                    <Form.Group className="mb-4">
                        <Form.Label className="text-uppercase text-secondary small">Immagini extra del gioco (puoi selezionarne più di una)</Form.Label>
                        <Form.Control
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            className="bg-black text-white border-secondary form-control-custom"
                        />
                        {error && <div className="text-danger small mt-1">{error}</div>}
                    </Form.Group>
                    <button type="submit" className="custom-button me-3">Aggiungi immagini</button>
                    <button type="button" className="custom-button-danger" onClick={() => navigate("/admin")}>Annulla</button>
                </Form>
                <h3 className="my-4 text-white">Immagini di {game.title}</h3>
                <Row className="flex-wrap">
                    {game.extraImages.map((img, index) => {
                        const fullUrl = img.image.startsWith("http") ? img.image : `https://localhost:7227/${img.image}`;
                        return (
                            <Col xs={3} className="mb-4" style={{ position: "relative" }}>
                                <Image
                                    key={index}
                                    src={fullUrl}
                                    alt={`extra-${index}`}
                                    className="image-custom"
                                />
                                <div className="custom-div-icon d-flex justify-content-center align-items-center" onClick={() => { setModalShow(true); setSelectedId(img.id); }}>
                                    <Trash className="text-white fs-2" />
                                </div>
                            </Col>
                        );
                    })}
                </Row>
            </>}
            <ModalDelete show={modalShow} onHide={() => setModalShow(false)} handleDelete={() => handleDelete()} />
        </Container>
    );
}

export default AddExtraImages;