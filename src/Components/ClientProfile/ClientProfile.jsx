import React, { useEffect, useRef, useState } from 'react';
import Header from '../Header/Header';
import './ClientProfile.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AddToCartIcon } from '../Icon';
import { Footer } from '../Footer/Footer';
import { SERVER_URL } from '../../Constants';
import { SingleProductCard } from '../SingleProductCard/SingleProductCard';
export default function ClientProfile() {
    const navigate = useNavigate()

    const user = useSelector((state) => {
        const profile = state.user?.user
        console.log(profile)
        if (profile) return profile; else navigate('/login')
    });
const client = useSelector((state) => state.user?.user);
    const favProducts = useSelector((state) => state.likes?.likes);
    const [fotoPortada, setFotoPortada] = useState(null);
    const [fotoPerfil, setFotoPerfil] = useState(user?.imagen);
    const [products, setProducts] = useState(Array(8).fill({}));
    const [markets, __] = useState(Array(5).fill({}));
    /* ------------ handle image errors -------------- */
    const handleCoverImageError = () => {
        coverRef.current.src = '/images/folder.png';
    };

    const handleProfileImageError = () => {
        profileRef.current.src = '/images/Campesinoprofile.jpg';
    };


    useEffect(() => {
        async function getProducts() {
            if (!user?.IDCliente == undefined) return;
            const response = await fetch(`${SERVER_URL}/api/compra/ListarPorCliente?idCliente=${user?.IDCliente}`);
            const data = await response.json();
            setProducts(data.productos);
        }
        getProducts();
    }, [user])

    const coverRef = useRef(null);
    const profileRef = useRef(null);
    // const handlePortadaChange = (event) => {
    //     const file = event.target.files[0];
    //     const reader = new FileReader();

    //     reader.onload = (e) => {
    //         setFotoPortada(e.target.result);
    //     };

    //     reader.readAsDataURL(file);
    // };

    const handlePerfilChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setFotoPerfil(e.target.result);
        };

        reader.readAsDataURL(file);
    };


    return (
        <>
            <Header />
            <section className="profile-pics">
                <div className="portada-container">
                    <img ref={coverRef} className="portada-img" src={fotoPortada ?? "x"} alt="Foto de portada" onError={handleCoverImageError} />
                    {/* <input type="file" className="portada-input" onChange={handlePortadaChange} /> */}
                </div>
                <div className='hojas'>
                    <img className='hojasIzquierda' src="/images/hojasizqDesc.png" alt="" width={200} height={255} />
                    <img className='hojasDerecha' src="/images/hojasderDesc.png" alt="" width={140} height={240} />
                </div>
                <section className="profile-absolute">
                    <div className="perfil-container">
                        <img ref={profileRef} onError={handleProfileImageError} className="perfil-img" src={fotoPerfil ?? "x"} alt="Foto de perfil" />
                        {/* <input type="file" className="perfil-input" onChange={handlePerfilChange} /> */}
                    </div>
                </section>
                <div className="profile-info">
                    <span className='nameLastName'>{user?.nombre} {user?.apellido}</span>
                    {/* <span>{user?.direccion}</span> */}
                    <span>{user?.edad}</span>
                </div>
            </section>

            <section className="profile-actions">

                <section className="general-control">

                    <details>
                        <summary>Control general de compras</summary>
                        <section className="content">

                            {
                                products.map((productItem, index) => (
                                    <SingleProductCard
                                    
                                        key={index}
                                        idProducto={productItem.idProducto}
                                        nombre={productItem.nombre}
                                        precio={productItem.precio}
                                        imagen={productItem.imagen}
                                        isLiked={false}
                                        userId={user?.IDCliente}
                                    />
                                ))
                            }
                        </section>
                    </details>
                </section>
                <section className="favourite-products">
                    <section className="general-control">

                        <details name='profile-sections'>
                            <summary>Productos favoritos</summary>
                            <section className="content">

                                {
                                    favProducts?.map((productItem, index) => (
                                        <SingleProductCard
                                            key={index}
                                            idProducto={productItem.idProducto}
                                            nombre={productItem.nombre}
                                            precio={productItem.precio}
                                            imagen={productItem.imagen}
                                            isLiked={true}
                                            userId={user?.IDCliente}
                                        />
                                    ))
                                }
                            </section>
                        </details>
                    </section>
                </section>
            </section>
            <Footer />
        </>
    );
}
