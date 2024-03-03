import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import './ClientProfile.css';
import ProductCard from '../ProductCard/ProductCard';
import { store } from '../../store';
import { login } from '../../store/slices/user';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';
export default function ClientProfile() {
    const user = useSelector((state) => state.user?.user);
    const [productosVisible, setProductosVisible] = useState(false);
    const [perfilComprado, setPerfilComprado] = useState('');
    const [fotoPortada, setFotoPortada] = useState(null);
    const [fotoPerfil, setFotoPerfil] = useState(null);
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) navigate('/login');
        else {
            const decoded = jwtDecode(token);
            store.dispatch(login(decoded));
        }
    }, []);




    const handlePortadaChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setFotoPortada(e.target.result);
        };

        reader.readAsDataURL(file);
    };

    const handlePerfilChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setFotoPerfil(e.target.result);
        };

        reader.readAsDataURL(file);
    };

    const toggleProductos = () => {
        setProductosVisible(!productosVisible);
    };

    const comprarProducto = (perfil) => {
        setPerfilComprado(perfil);
        toggleProductos(); // Cerrar la secciÃ³n de productos despuÃ©s de la compra
    };

    return (
        <div>
            <Header />
            <section className="profile-pics">
                <div className="portada-container">
                    <img className="portada-img" src={fotoPortada ?? "/images/profileback.png"} alt="Foto de portada" />
                    <input type="file" className="portada-input" onChange={handlePortadaChange} />
                </div>
                <section className="profile-absolute">
                    <div className="perfil-container">
                        <img className="perfil-img" src={fotoPerfil ?? "/images/Campesinoprofile.jpg"} alt="Foto de perfil" />
                        <input type="file" className="perfil-input" onChange={handlePerfilChange} />
                    </div>
                </section>
                <div className="profile-info">
                    <span className='nameLastName'>{user ? user.nombre : "Ejemplo Nombre"} {user ? user.apellido : "Ejemplo apellido"}</span>
                    <span>{user ? user.direccion : "Ejemplo ciudad"}</span>
                    <span> {user ? user.edad : 20}</span>
                </div>
            </section>



            {/* <div className="productos-container">
                <button onClick={toggleProductos}>Control General de Compras</button>
                {productosVisible && (
                    <div>
                        <h3>Aca se consume el mercado al que le compro</h3>
                        <ul>
                            <li>Producto 1 <button onClick={() => comprarProducto(user.nombre)}>Comprar</button></li>
                            <li>Producto 2 <button onClick={() => comprarProducto(user.nombre)}>Comprar</button></li>
                            Agrega mÃ¡s productos aquÃ­ Consumiendo la base de datos
                        </ul>
                    </div>
                )}
            </div> */}

            {/* {perfilComprado && (
                <div className="compra-info">
                    <h3>Ãšltima compra realizada:</h3>
                    <p>Producto comprado por: {perfilComprado}</p>
                </div>
            )} */}
            <div className='center_products_'>

                {/* <div className='featured_product'>
                    <h2 className='featured_product_title'>Productos destacados</h2>
                    <p>El alma de la tierra en cada producto</p>
                </div> */}

                {/* <div className='products_'>
                    <ProductCard />
                </div> */}

                {/* <button className='see_more_products' >
                    <a className='see_more_a' href="/products">Ver mÃ¡s...</a>
                </button> */}
            </div>
        </div>
    );
}
