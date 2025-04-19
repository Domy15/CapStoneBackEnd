import { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addComment } from "../../redux/actions/comments";

const AddCommentArea = ({ userName }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [comment, setComment] = useState("");

    const handleAddComment = async () => {
        try {
            if (!comment?.trim()) {
                return;
            }
            await addComment(comment, userName, id);
            dispatch({ type: "UPDATE" });
            setComment("");
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
                <button className="green-btn" onClick={handleAddComment}>
                    Pubblica la recensione
                </button>
            </div>
        </>
    );
}

export default AddCommentArea;