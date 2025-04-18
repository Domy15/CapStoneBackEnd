const SingleComment = ({ comment }) => {
    return (<div className="comment-card animate-fade mb-3 p-3 rounded text-white">
        <h6 className="fw-bold mb-1">👤 {comment.userName}</h6>
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
    </div>);
}

export default SingleComment;