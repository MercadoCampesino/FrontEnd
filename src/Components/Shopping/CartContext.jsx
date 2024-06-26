import React, { createContext, useState, useContext } from 'react';
import Swal from 'sweetalert2'

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    if (!cart.some(el => el.idProducto == product.idProducto)) return setCart([...cart, { ...product, cantidad: 1 }]);
    const updatedCart = cart.map((item, i) => {
      console.log({ item, i, product })
      if (!item.idProducto === product.idProducto) return item;
      if (item.cantidad === product.existencia) {
        Swal.fire({ position: "center", icon: 'error', title: "No se puede agregar más del producto", showConfirmButton: false, timer: 3000 });
        return item
      }
      return {
        ...item,
        cantidad: item.cantidad + 1
      };


    });
    setCart(updatedCart);

  };

  const removeFromCart = (idProducto) => {
    const updatedCart = cart.map(item => {
      if (item.idProducto === idProducto) {
        if (item.cantidad > 1) {
          return {
            ...item,
            cantidad: item.cantidad - 1
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

  const deleteFromCart = (idProducto) => {
    const updatedCart = cart.filter(item => item.idProducto !== idProducto);
    setCart(updatedCart);
  };

  const addOneToCart = (idProducto) => {
    const updatedCart = cart.map(item => {
      if (item.idProducto === idProducto) {
        return {
          ...item,
          cantidad: (item.cantidad ? item.cantidad : 0) + 1
        };
      }
      return item;
    });
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, deleteFromCart, addOneToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);







// CartContext.jsx
// import React, { createContext, useState, useContext } from 'react';

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   const addToCart = (product) => {
//     console.log(cart)
//     const isProductInCart = cart.some(item => item.idProducto === product.idProducto);
//     if (isProductInCart) {
//       const updatedCart = cart.map(item => {
//         if (item.idProducto === product.idProducto) {
//           if (item.cantidad === product.existencia) {
//             alert("No se puede agregar más del producto");
//             return item;
//           } else {
//             return {
//               ...item,
//               cantidad: (item.cantidad ? item.cantidad : 0) + 1
//             };
//           }
//         }
//         return item;
//       });
//       setCart(updatedCart);
//       return;
//     }
//     setCart([...cart, product]);
//   };

//   const removeFromCart = (idProducto) => {
//     const updatedCart = cart.map(item => {
//       if (item.idProducto === idProducto) {
//         if (item.cantidad > 1) {
//           return {
//             ...item,
//             cantidad: item.cantidad - 1
//           };
//         } else {
//           return null;
//         }
//       }
//       return item;
//     });

//     const deleteFromCart = (id) => {
//       setCart((currItems) => {
//         if (currItems.find((item) => item.id === id)?.quantity === 1) {
//           return currItems.filter((item) => item.id !== id);
//         } else {
//           return currItems.map((item) => {
//             if (item.id === id) {
//               return { ...item, quantity: item.quantity - 1 };
//             } else {
//               return item;
//             }
//           });
//         }
//       });
//     };

//     const newCart = updatedCart.filter(item => item !== null);
//     setCart(newCart);
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);
