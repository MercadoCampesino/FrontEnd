import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Header.css';
import { login } from '../../store/slices/user';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Shopping } from '../Shopping/Shopping';

export default function Header() {
    const dispatcher = useDispatch();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
    const user = useSelector((state) => state.user?.user);
    const isLogged = useSelector((state) => state.user?.user ? true : false);
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

    function handleLogOut() {
        localStorage.removeItem('token');
        dispatcher(login(null));
        navigate('/');
    }


    const [carritoAbierto, setCarritoAbierto] = useState(false);
    const [popoverPositions, setPopoverPositions] = useState({ top: 0, left: 0 });

    const toggleCarrito = () => {
        setCarritoAbierto(!carritoAbierto);
        if (!carritoAbierto) {
            const buttonRect = document.getElementById('boton-carrito').getBoundingClientRect();
            const popoverTop = buttonRect.top + buttonRect.height;
            const popoverLeft = buttonRect.left;
            setPopoverPositions({ top: popoverTop, left: popoverLeft });
        }
    };

    return (
        <>
            <header>
                <div className='title_merCampesino'>
                    <a href="/">
                        <img src="/images/logo_mercadoCampesino.png" alt="" width={35} height={65} />
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
                        {/* <button ><img className='img_bell' src="/images/notifications.png" alt="Bell" /></button> */}
                        {/* Tu código de Header existente aquí */}
                    
                        <button id="boton-carrito" onClick={toggleCarrito}><img src="/images/shoppingCart.png" alt="" width={30} height={30}/></button>
                        {carritoAbierto && <Shopping style={{ top: popoverPosition.top, left: popoverPosition.left }} />}{carritoAbierto && <Shopping />}                        <button onClick={handleButtonClick}><img className='image_perfil' src={isLogged ? "https://th.bing.com/th/id/OIP.eGHa3HgHxIlTHmcvKNDs7AHaGe?rs=1&pid=ImgDetMain" : "/images/profile.png"} alt="Profile" /></button>
                    </div>

                </div>
            </header>

            {isPopoverOpen && (
                <div className="popover" style={{ top: popoverPosition.top, left: popoverPosition.left }}>

                    <NavLink to={isLogged ? "/profile" : "/login"}>
                        {isLogged ? "Perfil" : "Ingresar"}
                    </NavLink>
                    {!isLogged && <NavLink to="/register">Registrarse</NavLink>}
                    {isLogged && <button onClick={handleLogOut}> cerrar sesion</button>}
                </div>
            )}
        </>
    );
}
