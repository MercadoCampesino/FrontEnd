import React, { useRef, useState } from "react";
import { ProductCard } from '../ProductCard/ProductCard';
// import markets from '../.././assets/Markets/markets';
import Header from '../Header/Header';
import './MarketProfile.css'
import { Footer } from '../Footer/Footer';
import AddProductForm from '../AddProductForm/AddProductForm';
import { useSelector } from 'react-redux';
// import { useState } from 'react'
// import { uploadFile } from './Firebase/config'


export default function ProfileMarket() {

    const [commentText, setCommentText] = useState(""); // Agrega un estado para almacenar el texto del comentario
    const [comments, setComments] = useState([]);

    const handleAddComment = (e) => {
        e.preventDefault();
        if (commentText.trim() !== "") {
            const newComment = {
                author: user.nombre,
                text: commentText,
            };
            setComments([...comments, newComment]);
            setCommentText(""); // Limpia el campo de texto del comentario después de agregar el comentario
        }
    };

    const handleChange = (e) => {
        setCommentText(e.target.value); // Actualiza el estado del texto del comentario cuando cambia el input
    };
    

    const [file, setFile] = useState(null)
    let imageUrl;

    const user = useSelector((state) => {
        const profile = state.user?.user
        if (profile) return profile; else navigate('/login')
    });
    const [showForm, setShowForm] = useState(false);
    const [fotoPerfil, setFotoPerfil] = useState(user?.imagen);
    const dialogRef = useRef(null);

    const handleCreateProduct = (productData) => {
        console.log("Nuevo producto:", productData);
        setShowForm(false);
    };

    const handleSudmit = async (e) => {
        e.preventDefault();
        try {
            const result = await uploadFile(file);
            console.log(result);
            imageUrl = result;// Actualiza el estado con la URL de la imagen
        } catch (error) {
            console.error(error);
            setError('Fallo al subir, inténtelo más tarde');
        }
    }


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
            <div className="container-marketProfile">
                {/* <div className='button-toEdit'>
                    <button>Editar perfil</button>
                </div> */}
                <div className="contprofile">
                    <section className="profile-absolutemarket">
                        <div className="perfil-containermarket">

                            <img className="perfil-imgmarket" src={fotoPerfil ?? "https://i.pinimg.com/736x/12/44/82/12448256903ff2d47988f4435dbacf5c.jpg"} alt="Foto de perfil" />
                            <input type="file" className="perfil-input" onChange={handlePerfilChange} />
                        </div>
                    </section>

                    <div>

                        <div className="profile-info">
                            <span className='nameLastName'>{user ? user.nombre : "Ejemplo Nombre"} {user ? user.apellido : "Ejemplo apellido"}</span>
                            <span>{user ? user.direccion : "Ejemplo ciudad"}</span>
                            <span> {user ? user.edad : 20}</span>
                        </div>
                    </div>
                </div>

                <div className='description-market'>
                    <p>Aqui exhibimos y vendemos una amplia variedad de productos frescos y cultivados localmente, como frutas y verduras de temporada, hierbas aromáticas, hortalizas, huevos, miel, lácteos y carnes de granja. Estos alimentos son cuidadosamente cultivados y cosechados con métodos sostenibles</p>

                </div>


                <div className='hojas'>
                    <img className='hojasIzquierda' src="/images/hojasizqDesc.png" alt="" width={200} height={255} />
                    <img className='hojasDerecha' src="/images/hojasderDesc.png" alt="" width={140} height={240} />
                </div>

                <div className="products-container">
                    <div className="add_product">
                        {/* cristian añada la el clasName de button */}
                        {/* <button className="addProduct-button" onClick={() => { dialogRef.current.showModal() }}>+</button>

                        <dialog ref={dialogRef}>
                            <AddProductForm callback={() => { dialogRef.current.close() }} onSubmit={handleCreateProduct} />
                        </dialog> */}

                        <button className="addProduct-button" onClick={() => { dialogRef.current.showModal() }}>+</button>

                        <dialog ref={dialogRef}>
                            <AddProductForm callback={() => { dialogRef.current.close() }} onSubmit={handleCreateProduct} />
                        </dialog>

                    </div>
                    <ProductCard />
                </div>

                <div className='hojas'>
                    <img className='hojasIzquierda' src="/images/hojasizqDesc.png" alt="" width={200} height={255} />
                    <img className='hojasDerecha' src="/images/hojasderDesc.png" alt="" width={140} height={240} />
                </div>

                <h2 className="tittlecalificaciones">Calificaciones de tu mercado</h2>

                <div className="reviews-container">
                    <div className="calificacion">
                        <h2>4.5</h2>
                        <img src="/images/calificaciones.png" alt="" width={200} />

                    </div>
                    <div>
                        <p className='comments'>Comentarios: <span>{comments.length}</span></p>
                        {comments.map((comment, index) => (
                            <div key={index} className="comment">
                                <p><strong>{comment.author}:</strong> {comment.text}</p>
                            </div>
                        ))}
                        {/* <div className='Send-comment'>
                            <input 
                                type="text" 
                                placeholder='Escribe una reseña' 
                                value={commentText} 
                                onChange={handleChange} // Maneja el cambio en el input
                                onKeyDown={(e) => e.key === 'Enter' ? handleAddComment(e) : null} 
                            />
                        </div> */}
                    </div>  
                </div>

                <hr className='hr' />

            </div>
            <Footer />
        </>
    )
}
