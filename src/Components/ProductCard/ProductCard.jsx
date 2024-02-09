import React from 'react'
import products from '../../assets/Products/products'
import './Product.css'


function ProductCard() {

    const firstFourProducts = products.slice(0, 12);

    return (
        <>
            {firstFourProducts.map((product) => (
                <div className='card_product' key={product.id}>
                    <img className='image' src={product.image} alt="" />
                        <p className='name_product'>{product.name}</p>
                        <p className='price_discount'><strong>Ahora: </strong><em>$</em> {product.price}</p>
                    <input className='buy' type="submit" value="Comprar"></input>
                </div>
            ))}
        </>
    )
}

export default ProductCard;