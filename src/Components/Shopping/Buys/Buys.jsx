import React from 'react'
import './Buys.css'

export const Buys = () => {

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
        </div>
      </div>
    </>
  )
}



