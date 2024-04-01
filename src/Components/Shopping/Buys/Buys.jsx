// import React, {useState} from 'react'
// import './Buys.css'
// import { useContext } from 'react'
// import { CartContext } from '../CartContext'
// import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';



// export const Buys = () => {
//   const calcularTotal = () => {
//     return cart.reduce((total, item) => total + item.precio * (item.counter ? item.counter : 1), 0);
//   };
//   const { cart, removeFromCart, addOneToCart, deleteFromCart } = useContext(CartContext)

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

//   const handleBuy = async () => {
//     for (const item of cart) {
//       const id = await createPreference(item);
//       if (id) {
//         setPreferenceId(id);
//       }
//     }
//   };


//   return (
//     <>
//       <img className='hojasIzquierdabig' src="/images/hojasizqDesc.png" alt="" width={250} height={350} />
//       <img className='hojasDerechabig' src="/images/hojasderDescbig.png" alt="" width={130} height={315} />
//       <div className='bodybuy'>
//         <div className='title_merCampesinobuy'>
//           <a href="/">
//             <img src="/images/logo_mercadoCampesino.png" alt="" width={35} height={65} />
//           </a>
//           <div className='title_headerbuy'>
//             <div className='titlebuy'>
//               <a className='a_titlebuy' href="/">
//                 <h1>MERCADO CAMPESINO</h1>
//                 <p>LA MEJOR CALIDAD</p>
//               </a>
//             </div>
//           </div>
//         </div>

//         <div className='productsshoppingbuy'>
//           <h1>TU COMPRA</h1>
//           {
//             cart.map(el => {

//               return (
//                 <div key={el.idProducto} className='itembuy'>
//                   <img src={el.imagen
//                   } alt="" width={80} height={85} />
//                   <div className='cont-info-productbuy'>
//                     <div className='info-namebuy'>
//                       <span>
//                         <h3>{el.nombre}</h3>
//                       </span>
//                     </div>
//                     <hr />
//                     <div className='info-pricebuy'>
//                       <span>${el.precio} 1Kg</span>
//                       <div className='info-cantbuy'>
//                         <span>Cantidad:</span>
//                         <span> {el.counter}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className='remove_increase_buttonbuy'>
//                     <button className='removeButtonbuy' onClick={() => removeFromCart(el.idProducto)}>-</button>
//                     <button className='increaseButtonbuy' onClick={() => addOneToCart(el.idProducto)}>+</button>
//                   </div>
//                   <button className='deleteButtonbuy' onClick={() => deleteFromCart(el.idProducto)}>X</button>

//                 </div>

//               )
//             })
//           }

//           <hr className='hrtotal' />
//           <div className='comprabuy'>
//             <strong>Total: ${calcularTotal()}</strong>
//             <button className='compra' onClick={handleBuy}>Comprar</button>
//       {preferenceId && <Wallet key={preferenceId} initialization={{ preferenceId: preferenceId }}/>}
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { CartContext } from '../CartContext';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import './Buys.css';

export const Buys = () => {
  const { cart, removeFromCart, addOneToCart, deleteFromCart } = useContext(CartContext);
  const [preferenceId, setPreferenceId] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Estado para indicar si se está cargando

  useEffect(() => {
    initMercadoPago('TEST-14335436-58e1-45e2-8c5e-1a4db40f1236', {
      locale: "es-CO"
    });
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      handleBuy();
    }
  }, [cart]);

  const calcularTotal = () => {
    return cart.reduce((total, item) => total + item.precio * (item.counter ? item.counter : 1), 0);
  };

  const createPreference = async (item) => {
    try {
      const response = await axios.post("https://backmercadopago.onrender.com/create_preference", {
        title: item.nombre, 
        quantity: item.counter ? item.counter : 1, 
        price: item.precio 
      });
      const { id } = response.data;
      return id;
    } catch (error) {
      console.log("Error al crear la preferencia:", error);
      return null;
    }
  };   
  
  const handleBuy = async () => {
    setIsLoading(true); // Indica que se está cargando

    for (const item of cart) {
      const id = await createPreference(item);
      if (id) {
        setPreferenceId(id);
        setIsLoading(false); // Oculta el indicador de carga una vez que se generó la preferencia
        break; // Rompe el bucle después de encontrar una preferencia exitosa
      }
    }
  };  

  return (
    <>
      <img className='hojasIzquierdabig' src="/images/hojasizqDesc.png" alt="" width={250} height={350} />
      <img className='hojasDerechabig' src="/images/hojasderDescbig.png" alt="" width={130} height={315} />
      <div className='bodybuy'>
        <div className='title_merCampesinobuy'>
          <a href="/">
            <img src="/images/logo_mercadoCampesino.png" alt="" width={35} height={65} />
          </a>
          <div className='title_headerbuy'>
            <div className='titlebuy'>
              <a className='a_titlebuy' href="/">
                <h1>MERCADO CAMPESINO</h1>
                <p>LA MEJOR CALIDAD</p>
              </a>
            </div>
          </div>
        </div>

        <div className='productsshoppingbuy'>
          <h1>TU COMPRA</h1>
          {
            cart.map(el => (
              <div key={el.idProducto} className='itembuy'>
                <img src={el.imagen} alt="" width={80} height={85} />
                <div className='cont-info-productbuy'>
                  <div className='info-namebuy'>
                    <span>
                      <h3>{el.nombre}</h3>
                    </span>
                  </div>
                  <hr />
                  <div className='info-pricebuy'>
                    <span>${el.precio} 1Kg</span>
                    <div className='info-cantbuy'>
                      <span>Cantidad:</span>
                      <span> {el.counter ? el.counter : 1}</span> {/* Mostrar 1 si la cantidad es 0 */}
                    </div>
                  </div>
                </div>
                <div className='remove_increase_buttonbuy'>
                  <button className='removeButtonbuy' onClick={() => removeFromCart(el.idProducto)}>-</button>
                  <button className='increaseButtonbuy' onClick={() => addOneToCart(el.idProducto)}>+</button>
                </div>
                <button className='deleteButtonbuy' onClick={() => deleteFromCart(el.idProducto)}>X</button>
              </div>
            ))
          }
          <div>
        <hr className='hrtotal' />
          <div className='comprabuy'>
            <strong>Total: ${calcularTotal()}</strong>
            {!preferenceId && isLoading && <div className="loading-indicator">Cargando...</div>}
            {preferenceId && (
              <div className='mercadopago'>
                <Wallet key={preferenceId} initialization={{ preferenceId: preferenceId }} />
              </div>
            )}
          </div>

          </div>
          
        </div>
      </div>
    </>
  );
};  
