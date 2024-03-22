import React, { useState } from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div>
            <button className="menu-button" onClick={toggleMenu}>☰</button>
            <ul className={`navbar ${showMenu ? 'show' : ''}`}>
                <li className='start'><NavLink to='/' onClick={toggleMenu}>Inicio</NavLink></li>
                <li className='discounts'><NavLink to='/discounts' onClick={toggleMenu}>Descuentos</NavLink></li>
                <li className='products'><NavLink to='/products' onClick={toggleMenu}>Productos</NavLink></li>
            </ul>
        </div>
    );
}
