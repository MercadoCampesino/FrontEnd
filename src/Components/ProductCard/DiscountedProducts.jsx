import React from 'react';
import productsDiscount from '../../assets/Products/productsDiscount';
import './DiscountedProducts.css'
import { AddToCartIcon } from '../Icon';
import { useCart } from '../Shopping/CartContext';


function DiscountedProducts({ showAll }) {

  const productsToShow = showAll ? productsDiscount : productsDiscount.slice(0, 4);


  const { addToCart } = useCart();
  const handleClick = (product) => {
    addToCart(product);
  }
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
              const productInSpanish = {
                ...product,
                nombre: product.name,
                precio: product.price,
                descuento: product.priceDiscount,
                imagen: product.image,
                idProducto: product.id,
                existencia: product.stock
              
              }
              
              handleClick(productInSpanish)
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
