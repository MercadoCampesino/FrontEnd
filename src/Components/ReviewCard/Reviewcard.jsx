import React from 'react'
import './ReviewCard.css'

export default function ReviewCard({ review }) {

    return (
        <div className="review-card">
            <div className="review-author"><h3>{review.author}</h3></div>
            <div className="review-text">{review.text}</div>
        </div>
    )
}
