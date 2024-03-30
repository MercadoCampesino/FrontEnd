import React from 'react'
import './VistaComentarios.css'

export default function VistaComentarios({ review }) {

    return (
        <div className="review-card">
            <div className="review-author"><h3>{review.author}</h3></div>
            <div className="review-text">{review.text}</div>
        </div>
    )
}