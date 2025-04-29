import { useEffect, useRef, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { changePfp } from "../../redux/actions/account";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";

const AvatarSetting = ({ profile, isLoadingProfile }) => {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const updateProfile = async () => {
        if (!file) return;

        setIsLoading(true);

        const formData = new FormData();
        formData.append("imageFile", file);

        toast.promise(
            (async () => {
                const response = await changePfp(formData, profile.userName);
                if (!response.success) {
                    throw new Error(response.message);
                }
                return response.message;
            })(),
            {
                pending: "Caricamento avatar...",
                success: "Avatar aggiornato con successo! 🎉",
                error: "Errore durante il caricamento 😢",
            }
        )
            .then(() => {
                setPreviewUrl(null);
                setFile(null);
                fileInputRef.current.value = null;
                dispatch({ type: "UPDATE" });
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
    }, [file]);
    return (
        <Col md={9}>
            <h3 className="mb-3 text-white">Avatar</h3>
            <p className="text-secondary">Scegli l'immagine dell'avatar e la cornice.</p>

            <Row className="mt-5 w-100">
                <Col xs={3}>
                    {profile && !isLoadingProfile ?
                        <Image
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
                    <Button variant="secondary" onClick={triggerFileInput}>Carica il tuo avatar</Button>
                    <p className="text-secondary mt-2">
                        Carica un file dal tuo dispositivo. L'immagine deve essere quadrata, di almeno 184px x 184px.
                    </p>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{ display: "none" }}
                    />
                </Col>
            </Row>
            {previewUrl &&
                <div className="mt-4">
                    <Image
                        src={previewUrl}
                        style={{ width: "184px", height: "184px" }}
                    />
                    <div className="mt-4">
                        <button className="custom-button-secondary me-4" onClick={() => { setPreviewUrl(null); setFile(null); fileInputRef.current.value = null; }}>Annulla</button>
                        <button className="custom-button" onClick={updateProfile} disabled={isLoading}>
                            {isLoading ? "Salvataggio..." : "Salva"}
                        </button>
                    </div>
                </div>}
        </Col>
    );
}

export default AvatarSetting;