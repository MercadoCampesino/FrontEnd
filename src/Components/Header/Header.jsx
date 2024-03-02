import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Header.css';
import { store } from '../../store';
import { login } from '../../store/slices/user';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Header() {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
    const [isLogged, setIsLogged] = useState(false);
    const navigate = useNavigate()
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
    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            const user = store.getState().user;
            if (user) setIsLogged(true);
        });
        return () => { unsubscribe(); };
    }, []);

    function handleLogOut() {
        localStorage.removeItem('token');
        store.dispatch(login(null));
        setIsLogged(false);
        navigate('/login');
    }

    return (
        <>
            <header>
                <div className='title_merCampesino'>
                    <a href="/">
                        <img src="/images/logo_mercadoCampesino.png" alt="" width={50} height={85} />
                    </a>

                    <div className='title_header'>

                        <div className='title'>
                            <a className='a_title' href="/">
                                <h1>MERCADO CAMPESINO</h1>
                                <p>LA MEJOR CALIDAD</p>
                            </a>
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

            {isPopoverOpen && (
                <div className="popover" style={{ top: popoverPosition.top, left: popoverPosition.left }}>

                    <NavLink to={isLogged ? "/client-profile" : "/login"}>
                        {isLogged ? "Perfil" : "Ingresar"}
                    </NavLink>
                    {!isLogged && <NavLink to="/register">Registrarse</NavLink>}
                    {isLogged && <button onClick={handleLogOut}> cerrar sesion</button>}
                </div>
            )}
        </>
    );
}
