import React, { useState } from 'react';
import './Shopping.css';
import DiscountedProducts from '../ProductCard/DiscountedProducts';
import { useCart } from './CartContext';

export const Shopping = () => {
  const { cart, removeFromCart } = useCart();

  const calcularTotal = () => {
    return cart.reduce((total, item) => total + item.precio * (item.counter ? item.counter : 1), 0);
  };

  return (
    <div className="carrito">
      
        <h2>Carrito de Compras</h2>
        {cart.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <ul className='item-list'>
            {cart.map(item => (
          <li className='item' key={item.idProducto}>
            <section className="item-info">

              <span>{item.nombre} - ${item.precio}</span>
              {item.counter && <strong>{item.counter}</strong>}
            </section>
            <button onClick={() => removeFromCart(item.idProducto)}>Eliminar</button>
          </li>
            ))}
          </ul>
        )}
        <strong>Total: ${calcularTotal()}</strong>
        <button className='compra' onClick={() => alert('Compra realizada')}>Comprar</button>

      {/* Aquí se agrega el componente DiscountedProducts */}
    </div>

  );
};
