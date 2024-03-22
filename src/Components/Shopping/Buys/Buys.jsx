import React from 'react'
import './Buys.css'
import { useContext } from 'react'
import { CartContext } from '../CartContext'


export const Buys = () => {
  const calcularTotal = () => {
    return cart.reduce((total, item) => total + item.precio * (item.counter ? item.counter : 1), 0);
  };
  const { cart, removeFromCart, addOneToCart, deleteFromCart } = useContext(CartContext)
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

        <div>
          <h1>TU COMPRA</h1>
          {
            cart.map(el => {

              return (
                <div key={el.idProducto} className='itembuy'>
                  <img src={el.imagen
                  } alt="" width={80} height={85} />
                  <div className='cont-info-productbuy'>
                    <div className='info-namebuy'>
                      <span>
                        <h3>{el.nombre}</h3>
                      </span>
                    </div>
                    <hr />
                    <div className='info-pricebuy'>
                      <span>${el.precio}</span>
                      <div className='info-cantbuy'>
                        <span>Cantidad:</span>
                        <span> {el.counter}</span>
                      </div>
                    </div>
                  </div>
                  <div className='remove_increase_buttonbuy'>
                    <button className='removeButtonbuy' onClick={() => removeFromCart(el.idProducto)}>-</button>
                    <button className='increaseButtonbuy' onClick={() => addOneToCart(el.idProducto)}>+</button>
                  </div>
                  <button className='deleteButtonbuy' onClick={() => deleteFromCart(el.idProducto)}>Eliminar</button>

                </div>
                  
              )
            })
          }
        </div>
        <strong>Total: ${calcularTotal()}</strong>
      </div>
    </>
  )
}



