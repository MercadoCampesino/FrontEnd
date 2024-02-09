import React from 'react'
import markets from '../.././assets/Markets/markets';
import './Market.css'

export default function Market() {
    return (
        <>
            {markets.map((market) => (
                <div className='card_market' key={market.id}>
                    <img className='image_market' src={market.image} alt="#" />
                    <p className='name_market'>{market.name}</p>
                </div>
            ))}
        </>
    )
}
