import React, { useState } from "react";

export default function Comentarios({ comments, onAddComment }) {

    const [commentText, setCommentText] = useState("");

    const handleAddComment = (e) => {
        e.preventDefault();
        if (commentText.trim() !== "") {
            onAddComment(commentText);
            setCommentText("");
        }
    };

    const handleChange = (e) => {
        setCommentText(e.target.value);
    };

    return (
        <>
            <div>
                <p className='comments'>Comentarios: <span>{comments.length}</span></p>
                {comments.map((comment, index) => (
                    <div key={index} className="comment">
                        <p><strong>{comment.author}:</strong> {comment.text}</p>
                    </div>
                ))}
                <div className='Send-comment'>
                    <input
                        type="text"
                        placeholder='Escribe una reseña'
                        value={commentText}
                        onChange={handleChange}
                        onKeyDown={(e) => e.key === 'Enter' ? handleAddComment(e) : null}
                    />
                </div>
            </div>
        </>
    )
}
