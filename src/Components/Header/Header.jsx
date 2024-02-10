import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Header.css';

export default function Header() {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });

    const togglePopover = () => {
        setIsPopoverOpen(!isPopoverOpen);
    };

    const handleButtonClick = (event) => {
        const buttonRect = event.target.getBoundingClientRect();
        const popoverTop = buttonRect.top + buttonRect.height;
        const popoverLeft = buttonRect.left;

        setPopoverPosition({ top: popoverTop, left: popoverLeft });
        togglePopover();
    };

    return (
        <>
            <header>
                <div className='title_merCampesino'>
                    <img src="/images/logo_mercadoCampesino.png" alt="" width={50} height={85} />
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
                        {/* Botones con popover */}
                        <button ><img className='img_bell' src="/images/notifications.png" alt="Bell" /></button>
                        <button ><img className='img_cart' src="/images/shoppingCart.png" alt="Shopping cart" /></button>
                        <button onClick={handleButtonClick}><img className='image_perfil' src="/images/profile.png" alt="Profile" /></button>
                    </div>
                </div>
            </header>

            {/* Popover */}
            {isPopoverOpen && (
                <div className="popover" style={{ top: popoverPosition.top, left: popoverPosition.left }}>
                    <div className='login_registropop'>
                        <a href="/login">Iniciar sesion</a>
                        <hr/>
                        <a href="">Registrarse</a>
                    </div>
                </div>
            )}
        </>
    );
}
