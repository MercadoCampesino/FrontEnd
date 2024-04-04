import React, { createContext, useState, useContext } from 'react';
import Swal from 'sweetalert2'

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    console.log(cart)
    const isProductInCart = cart.some(item => item.idProducto === product.idProducto);

    if (isProductInCart) {
      const updatedCart = cart.map(item => {
        if (!item.idProducto === product.idProducto) return item;
        if (item.counter === product.existencia) {
          Swal.fire({ position: "center", icon: 'error', title: "No se puede agregar más del producto", showConfirmButton: false, timer: 3000 });
          return item
        }

        console.log(item)
        return {
          ...item, counter: (item.counter ?? 0) + 1
        };


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

  const deleteFromCart = (idProducto) => {
    const updatedCart = cart.filter(item => item.idProducto !== idProducto);
    setCart(updatedCart);
  };

  const addOneToCart = (idProducto) => {
    const updatedCart = cart.map(item => {
      if (item.idProducto === idProducto) {
        return {
          ...item,
          counter: (item.counter ? item.counter : 0) + 1
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
//           if (item.counter === product.existencia) {
//             alert("No se puede agregar más del producto");
//             return item;
//           } else {
//             return {
//               ...item,
//               counter: (item.counter ? item.counter : 0) + 1
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
//         if (item.counter > 1) {
//           return {
//             ...item,
//             counter: item.counter - 1
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
