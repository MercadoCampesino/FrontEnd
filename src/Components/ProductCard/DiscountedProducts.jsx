import React from 'react';
import productsDiscount from '../../assets/Products/productsDiscount';
import './DiscountedProducts.css'
import { AddToCartIcon } from '../Icon';


function DiscountedProducts({ showAll, agregarAlCarrito }) {

  const productsToShow = showAll ? productsDiscount : productsDiscount.slice(0, 4);

  return (
    <>
      {productsToShow.map((product) => (
        <div className='card_products' key={product.id}>
          <img className='images' src={product.image} alt="" />
          <p className='name_products'>{product.name}</p>

          <div className='name_price_product'>
            <p className='price_discount'><strong>Ahora: </strong> <em>$</em> {product.priceDiscount} 1Kg</p>
            <p className='price_discount'><strong>Antes: </strong><span ><em>$</em> {product.price}  1Kg</span> </p>
          </div>

          <div className='agregarboton'>
          <button className='button-addToCartIcon' onClick={() => {
              console.log('agregarAlCarrito:', agregarAlCarrito);

              agregarAlCarrito(product);
            }}>
              <AddToCartIcon />
              <p>Agregar</p>
            </button>
          </div>
          
        </div>
      ))}
    </>
  );
}

export default DiscountedProducts;
