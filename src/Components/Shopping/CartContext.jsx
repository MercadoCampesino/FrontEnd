// CartContext.jsx
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    console.log(cart)
    const isProductInCart = cart.some(item => item.idProducto === product.idProducto);
    if (isProductInCart) {
      const updatedCart = cart.map(item => {
        if (item.idProducto === product.idProducto) {
          if (item.counter === product.existencia) {
            alert("No se puede agregar más del producto");
            return item;
          } else {
            return {
              ...item,
              counter: (item.counter ? item.counter : 0) + 1
            };
          }
        }
        return item;
      });
      setCart(updatedCart);
      return;
    }
    setCart([...cart, product]);
  };

  const removeFromCart = (idProducto) => {
    const updatedCart = cart.map(item => {
      if (item.idProducto === idProducto) {
        if (item.counter > 1) {
          return {
            ...item,
            counter: item.counter - 1
          };
        } else {
          return null;
        }
      }
      return item;
    });

    const newCart = updatedCart.filter(item => item !== null);
    setCart(newCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
