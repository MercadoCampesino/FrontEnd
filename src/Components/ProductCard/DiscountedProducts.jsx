import React from 'react';
import productsDiscount from '../../assets/Products/productsDiscount';
import './DiscountedProducts.css'

function DiscountedProducts({ showAll }) {

  const productsToShow = showAll ? productsDiscount : productsDiscount.slice(0, 4);

  return (
    <>
      {productsToShow.map((product) => (
        <div className='card_products' key={product.id}>
          <img className='images' src={product.image} alt="" />
            <p className='name_products'>{product.name}</p>
          <div className='name_price_product'>
            <p className='price_discount'><strong>Ahora: </strong><em>$</em> {product.priceDiscount}</p>
            <p><strong>Antes: </strong><span className='price_products_'> <em>$</em> {product.price}</span></p>
          </div>
          <input className='buys' type="submit" value="Comprar" />
        </div>
      ))}
    </>
  );
}

export default DiscountedProducts;
