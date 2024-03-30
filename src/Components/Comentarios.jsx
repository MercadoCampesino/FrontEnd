import React, { useState } from "react";
import Reviewcard from './ReviewCard/ReviewCard';


export default function Comentarios({ comments, onAddComment }) {

    const reviews = [
        {
            author: 'Jessica Gomez',
            text: 'Excelentes productos, de muy buena calidad... Quedé encantada',
        },
        {
            author: 'Sergio Lopez',
            text: 'Muy buenos los productos para muy demorada la entrega',
        },
        {
            author: 'Elvia Martinez',
            text: 'Muy buenos precios y la calidad excelente',
        },
    ];


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
                {reviews.map((review) => (
                    <Reviewcard key={review.author} review={review} />
                ))}
                {comments.map((comment, index) => (
                    <div key={index} className="comment">
                        <p className="review-author"><strong>{comment.author} <br />
                        </strong> {comment.text}</p>
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
