import React from 'react'
import './Footer.css'

export const Footer = () => {
    return (
        <>
            <div className='mainContainer'>
                <div className='title_footer'>
                    <img src="/images/logo_mercadoCampesino.png" alt="" width={37} height={65} />
                    <div className='titleFooter'>
                        <h1>MERCADO CAMPESINO</h1>
                        <p>LA MEJOR CALIDAD</p>
                    </div>
                </div>

                <div className='infoContainer'>
                    <div>
                        <h2>Sobre nosotros</h2>
                        <p>Colombiana de Comercio S.A.</p>
                        <p>NIT: 890.900.943-1</p>
                        <a href="">Terminos y condiciones</a>
                    </div>
                    <div>
                        <h2>Metodos de pago</h2>

                    </div>
                    <div>
                        <h2>Contactanos</h2>
                        <p>MercadoCampesino@gmail.com</p>
                        <p>+57 3136297064</p>
                        <p>+57 3145672345</p>
                    </div>
                </div>

                <hr className='hr_footer' />
                <p className='copy'>&copy; Mercado Campesino</p>
            </div>
        </>
    )
}
