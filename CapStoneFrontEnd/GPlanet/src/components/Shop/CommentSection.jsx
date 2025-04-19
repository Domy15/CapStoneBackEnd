/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SingleComment from "./SingleComment";
import AddCommentArea from "./AddCommentArea";
import { fetchLibrary } from "../../redux/actions/library";
import { fetchComments } from "../../redux/actions/comments";

const CommentSection = () => {
    const { id } = useParams();
    const update = useSelector(state => state.update);
    const userName = useSelector(state => state.profile.userName);
    const [isThereLibrary, setIsThereLibrary] = useState(false);
    const [comments, setComments] = useState([]);
    const [showAll, setShowAll] = useState(false);

    const checkLibrary = async () => {
        try {
            const data = await fetchLibrary(userName);
            setIsThereLibrary(data.library.some(g => g.id === id));
        } catch (error) {
            console.error(error);
        }
    };

    const getComments = async () => {
        try {
            const data = await fetchComments(id);
            setComments(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getComments();
        if (userName) {
            checkLibrary();
        }
    }, [userName, update]);

    return (
        <Row className="mt-5">
            {isThereLibrary && (
                <Col xs={12} lg={6} className="p-3 text-white rounded">
                    <AddCommentArea userName={userName} />
                </Col>
            )}
            <Col xs={12} lg={6} className="p-3">
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
