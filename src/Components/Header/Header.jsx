import React from 'react'
import Navbar from '../Navbar/Navbar'
import './Header.css'

export default function Header() {
    return (
        <>
            <header>
                <div className='title_merCampesino'>
                    <img src="/logo_mercadoCampesino.png" alt="" width={50} height={85} />
                    <div className='title_header'>
                        <div className='title'>
                            <h1>MERCADO CAMPESINO</h1>
                            <p>LA MEJOR CALIDAD</p>
                        </div>
                    </div>
                </div>

                <div className='navbar_img'>
                    <div>
                        <Navbar />
                    </div>

                    <div className='img_header'>
                        <img className='img_bell' src="./notifications.png" alt="Bell" />
                        <img className='img_cart' src="./shoppingCart.png" alt="Shopping cart" />
                        <img className='image_perfil' src="./profile.png" alt="Profile" />
                    </div>
                </div>
            </header>
        </>
    )
}
