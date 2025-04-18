import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pencil, TrashFill, XLg } from "react-bootstrap-icons";

const SingleComment = ({ comment }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.profile);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState("");

    const isOwnerOrAdmin = currentUser.userName === comment.userName || currentUser.role === "Admin";

    const updateComment = async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await fetch(`https://localhost:7227/api/Comment/${comment.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token.token}`
                },
                body: JSON.stringify(editedContent)
            });
            if (response.ok) {
                setIsEditing(false);
                dispatch({ type: "UPDATE" });
            } else {
                throw new Error("Errore nella modifica del commento!");
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    const deleteComment = async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await fetch(`https://localhost:7227/api/Comment/${comment.id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token.token}`
                }
            });
            if (response.ok) {
                setIsEditing(false);
                dispatch({ type: "UPDATE" });
            } else {
                throw new Error("Errore nell'eliminazione del commento!");
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="comment-card animate-fade mb-3 p-3 rounded text-white position-relative">
            <div className="d-flex justify-content-between align-items-start">
                <h6 className="fw-bold mb-1">👤 {comment.userName}</h6>

                {isOwnerOrAdmin && !isEditing ? (
                    <Pencil
                        role="button"
                        className="text-light"
                        onClick={() => { setEditedContent(comment.content); setIsEditing(true); }}
                        title="Modifica commento"
                    />
                ) : isOwnerOrAdmin && isEditing && (
                    <div className="d-flex">
                        <TrashFill
                            role="button"
                            className="text-light"
                            onClick={deleteComment}
                            title="Elimina commento"
                        />
                        <XLg
                            role="button"
                            className="text-light ms-2"
                            onClick={() => setIsEditing(false)}
                            title="Annulla"
                        />
                    </div>
                )}
            </div>

            {isEditing ? (
                <>
                    <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="form-control bg-dark text-white mb-2"
                        rows={3}
                    />
                    <button className="btn btn-success btn-sm" onClick={updateComment}>
                        Salva
                    </button>
                </>
            ) : (
                <>
                    <p className="mb-1">{comment.content}</p>
                    <small className="text-secondary">
                        {new Date(comment.publishedAt).toLocaleString("it-IT", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </small>
                </>
            )}
        </div>
    );
};

export default SingleComment;
