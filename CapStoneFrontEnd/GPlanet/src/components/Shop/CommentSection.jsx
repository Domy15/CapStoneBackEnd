/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SingleComment from "./SingleComment";
import AddCommentArea from "./AddCommentArea";

const CommentSection = () => {
    const { id } = useParams();
    const update = useSelector(state => state.update);
    const userName = useSelector(state => state.profile.userName);
    const [isThereLibrary, setIsThereLibrary] = useState(false);
    const [comments, setComments] = useState([]);
    const [showAll, setShowAll] = useState(false);

    const getLibrary = async () => {
        const getToken = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await fetch(`https://localhost:7227/api/Library/${userName}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${getToken.token}`,
                }
            });
            if (response.ok) {
                const data = await response.json();
                setIsThereLibrary(data.library.some(g => g.id === id));
            } else {
                throw new Error("Errore nel recupero dei dati!");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getComments = async () => {
        try {
            const response = await fetch(`https://localhost:7227/api/Comment/getByGame/${id}`);
            if (response.ok) {
                const data = await response.json();
                const sorted = data.comments.sort(
                    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
                );
                setComments(sorted);
            } else {
                throw new Error("Errore nel recupero dei dati!");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getComments();
        if (userName) {
            getLibrary();
        }
    }, [userName, update]);

    return (
        <Row className="mt-5">
            {isThereLibrary && (
                <Col className="p-3 text-white rounded">
                    <AddCommentArea userName={userName} />
                </Col>
            )}
            <Col className="p-3">
                {comments.length > 0 ? (
                    <>
                        {(showAll ? comments : comments.slice(0, 3)).map((comment, i) => (
                            <SingleComment key={i} comment={comment} />
                        ))}
                        {comments.length > 3 && (
                            <button className="see-more-btn" onClick={() => setShowAll(!showAll)}>
                                {showAll ? "Mostra meno" : "Vedi tutti i commenti"}
                            </button>
                        )}
                    </>
                ) : (
                    <p className="text-white">Non ci sono commenti!</p>
                )}
            </Col>
        </Row>
    );
};

export default CommentSection;
