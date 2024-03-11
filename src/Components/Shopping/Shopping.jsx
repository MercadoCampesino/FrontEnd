import React, { useState } from 'react';
import './Shopping.css';
import DiscountedProducts from '../ProductCard/DiscountedProducts';
import { useCart } from './CartContext';

export const Shopping = () => {
  const [items, setItems] = useState(useCart().cart);
  const agregarAlCarrito = (producto) => {
    setItems([...items, producto]);
  };

  const eliminarDelCarrito = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const calcularTotal = () => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="carrito">
        {/* <img src="/images/hojasderDesc.png" alt="" width={250} /> */}
      <h2>Carrito de Compras</h2>
      {items.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <span>{item.name} - ${item.price}</span>
              <button onClick={() => eliminarDelCarrito(index)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
      <p>Total: ${calcularTotal()}</p>

      {/* Aquí se agrega el componente DiscountedProducts */}
    </div>
    
  );
};
