import React, { useState } from 'react';
import './Shopping.css';
import DiscountedProducts from '../ProductCard/DiscountedProducts';
import { useCart } from './CartContext';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from 'axios'; // Agrega esta importación

export const Shopping = () => {
  const { cart, removeFromCart } = useCart();

  const calcularTotal = () => {
    return cart.reduce((total, item) => total + item.precio * (item.counter ? item.counter : 1), 0);
  };
  
  const [preferenceId, setPreferenceId] = useState(null);

  initMercadoPago('TEST-14335436-58e1-45e2-8c5e-1a4db40f1236', { // Reemplaza con tu access token de Mercado Pago
      locale: "es-CO"
  });
  
  const createPreference = async (item) => { // Pasa el artículo como parámetro
      try {
          const response = await axios.post("https://backmercadopago.onrender.com/create_preference", {
               title: item.nombre, quantity: item.counter ? item.counter : 1, price: item.precio // Modifica para usar el artículo actual
          });
          const { id } = response.data;
          return id;
      } catch (error) {
          console.log("Error al crear la preferencia:", error);
          return null;
      }
  };

  const handleBuy = async () => {
      // Itera sobre cada artículo en el carrito
      for (const item of cart) {
          const id = await createPreference(item); // Pasa el artículo actual a createPreference
          if (id) {
              setPreferenceId(id);
          }
      }
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
                <img src={item.imagen} alt="" width={80} height={85}/>
                <span>{item.nombre} - ${item.precio}</span>
                {item.counter && <strong>{item.counter}</strong>}
              </section>
              <button onClick={() => removeFromCart(item.idProducto)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
      <strong>Total: ${calcularTotal()}</strong>
      <button className='compra' onClick={handleBuy}>Comprar</button>
      {preferenceId && <Wallet key={preferenceId} initialization={{ preferenceId: preferenceId }}/>}
    </div>
  );
};