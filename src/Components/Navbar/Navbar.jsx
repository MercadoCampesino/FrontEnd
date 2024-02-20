import React from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
    return (
        <div>
            <ul className='navbar'>
                <li className='start'><NavLink to='/'>Inicio</NavLink></li>
                <li className='discounts'><NavLink to='/discounts'>Descuentos</NavLink></li>
                <li className='products'><NavLink to='/products'>Productos</NavLink></li>
            </ul>
        </div>
    )
}
