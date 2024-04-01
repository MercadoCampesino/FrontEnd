import React, { useState } from 'react';
import './Shopping.css';
import DiscountedProducts from '../ProductCard/DiscountedProducts';
import { useCart } from './CartContext'; // Importa el contexto del carrito
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2'

export const Shopping = () => {
  const { cart, removeFromCart, addOneToCart, deleteFromCart } = useCart(); // Obtén las funciones del contexto del carrito
  const [showMessage, setShowMessage] = useState(false); // Estado para controlar si se muestra el mensaje

  const calcularTotal = () => {
    return cart.reduce((total, item) => total + item.precio * (item.counter ? item.counter : 1), 0);
  };

  const handleCompraClick = () => {
    if (cart.length === 0) {
      setShowMessage(true); // Si no hay productos en el carrito, muestra el mensaje
    }
  };

  const handleAddToCart = () => {
    setShowMessage(false); // Reinicia el estado showMessage cuando se agrega un producto al carrito
  };

  const confirmDelete = (idProducto) => {
    Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí",
        cancelButtonText: "No"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Producto eliminado correctamente.",
                showConfirmButton: false,
                timer: 1500
            });
            deleteFromCart(idProducto); // Solo eliminar si se confirma
        } else {
            Swal.fire("Cancelado", "Tu producto está a salvo :)", "info");
        }
    });
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
                <img src={item.imagen} alt="" width={80} height={85} />

                <div className='cont-info-product'>
                  <div className='info-name'>
                    <span>
                      <h3>{item.nombre}</h3>
                    </span>
                  </div>

                  <hr />

                  <div className='info-price'>
                    <span>${item.precio}</span>

                    <div className='info-cant'>
                      <span>Cantidad:</span>
                      <span> {item.counter || 1}</span>
                    </div>
                  </div>
                </div>
              </section>
              

              <div className='remove_increase_button'>
                <button className='removeButton' onClick={() => removeFromCart(item.idProducto)}>-</button>
                <button className='increaseButton' onClick={() => {addOneToCart(item.idProducto); handleAddToCart();}}>+</button>
              </div>

              <button className='deleteButton' onClick={() => confirmDelete(item.idProducto)}>x</button>
            </li>
          ))}
        </ul>
      )}
      <div className='comprashopping'>
        <strong className='totalshopping'>Total: ${calcularTotal()}</strong>
        {cart.length > 0 && (
          <NavLink to='/buy' className='compra' >Realizar compra</NavLink>
        )}
      </div>
      {showMessage && <p className="empty-cart-message">Por favor, agregue productos al carrito primero.</p>}
    </div>
  );
};



// import React, { useState } from 'react';
// import './Shopping.css';
// import { useCart } from './CartContext';
// import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
// import axios from 'axios';
// import { Buys } from './Buys/Buys';

// export const Shopping = () => {
//   const { cart, removeFromCart } = useCart();

//   const calcularTotal = () => {
//     return cart.reduce((total, item) => total + item.precio * (item.counter ? item.counter : 1), 0);
//   };

//   const handleBuy = async () => {
//     for (const item of cart) {
//       const id = await createPreference(item); // Pasa el artículo actual a createPreference
//       if (id) {
//         setPreferenceId(id);
//       }
//     }
//   };

//   const [preferenceId, setPreferenceId] = useState(null);

//   initMercadoPago('TEST-14335436-58e1-45e2-8c5e-1a4db40f1236', {
//     locale: "es-CO"
//   });

//   const createPreference = async (item) => {
//     try {
//       const response = await axios.post("https://backmercadopago.onrender.com/create_preference", {
//         title: item.nombre, quantity: item.counter ? item.counter : 1, price: item.precio
//       });
//       const { id } = response.data;
//       return id;
//     } catch (error) {
//       console.log("Error al crear la preferencia:", error);
//       return null;
//     }
//   };

//   return (
//     <div className="carrito">
//       <h2>Carrito de Compras</h2>
//       {cart.length === 0 ? (
//         <p>No hay productos en el carrito.</p>
//       ) : (
//         <ul className='item-list'>
//           {cart.length(item => (
//             <li className='item' key={item.idProducto}>
//               <section className="item-info">
//                 <img src={item.imagen} alt="" width={80} height={85} />
//                 <div className='cont-info-product'>
//                   <div className='info-name'>
//                     <span>
//                       <h3>{item.nombre}</h3>
//                     </span>
//                   </div>
//                   <hr />
//                   <div className='info-price'>
//                     <span>${item.precio}</span>
//                     <div className='info-cant'>
//                       <span>Cantidad:</span>
//                       {item.counter && <span> {item.counter}</span>}
//                     </div>
//                   </div>
//                 </div>
//               </section>
//               <button className='removeButton' onClick={() => removeFromCart(item.idProducto)}>-</button>
//               <button className='increaseButton' onClick={() => increaseFromCart(item.idProducto)}>+</button>
//             </li>
//           ))}
//         </ul>
//       )}
//       <strong>Total: ${calcularTotal()}</strong>
//       <a href='/buy' className='compra' onClick={handleBuy} >Comprar</a>
//       {preferenceId && <Wallet key={preferenceId} initialization={{ preferenceId: preferenceId }} />}
//     </div>
//   );
// };


