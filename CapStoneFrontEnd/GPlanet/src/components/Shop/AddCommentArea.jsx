import { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const AddCommentArea = ({ userName }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [comment, setComment] = useState("");

    const addComment = async () => {
        const getToken = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await fetch(`https://localhost:7227/api/Comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken.token}`
                },
                body: JSON.stringify({
                    content: comment,
                    userName: userName,
                    idGame: id
                })
            });
            if (response.ok) {
                dispatch({ type: "UPDATE" });
                setComment("");
            } else {
                throw new Error("Errore nell'aggiunta del commento!");
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <h5 className="mb-3">👤 {userName}</h5>
            <Form.Control
                as="textarea"
                rows={4}
                placeholder="Scrivi il tuo commento qui..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mb-3 bg-transparent text-white custom-textarea"
            />
            <div className="bg-black custom-div-btn">
                <button className="green-btn" onClick={addComment}>
                    Pubblica la recensione
                </button>
            </div>
        </>
    );
}

export default AddCommentArea;