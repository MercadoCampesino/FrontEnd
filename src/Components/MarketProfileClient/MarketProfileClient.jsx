import React, { useState } from 'react';
import { Footer } from '../Footer/Footer';
import Header from '../Header/Header';
import { ProductCard } from '../ProductCard/ProductCard';
import Comentarios from '../Comentarios';
import './MarketProfileClient.css'
// import Reviewcard from '../ReviewCard/Reviewcard';

export const MarketProfileClient = () => {
    const [comments, setComments] = useState([]);

    const handleAddComment = (commentText) => {
        if (commentText.trim() !== "") {
            const newComment = {
                author: 'usuario',
                text: commentText,
            };
            setComments([...comments, newComment]);
        }
    };

    return (
        <>
            <Header />
            <div className="container-marketProfile">
                <div className="contprofile">
                            <img className='hojaPofile' src="/images/hojasizqDesc.png" alt=""  />
                    <section className="profile-absolutemarket">
                        <div className="perfil-containermarket">
                            <img className="perfil-imgmarket perfil_market_c" src='https://i.pinimg.com/564x/fc/5d/5c/fc5d5c16121bb3d34f9efabc441f0a65.jpg' alt="Foto de perfil" />
                        </div>
                    </section>

                    <div className='profile-infomarket'>
                        <h2 className='name_finca'>Finca Iberica</h2>
                        <p>Armenia, Quindio</p>
                    </div>
                </div>
                <div className='description-market'>
                    <p>Aqui exhibimos y vendemos una amplia variedad de productos frescos y cultivados localmente, como frutas y verduras de temporada, hierbas aromáticas, hortalizas, huevos, miel, lácteos y carnes de granja. Estos alimentos son cuidadosamente cultivados y cosechados con métodos sostenibles</p>
                </div>
                <div className='hojas'>
                    <img className='hojasIzquierda' src="/images/hojasizqDesc.png" alt="" width={200} height={255} />
                    <img className='hojasDerecha' src="/images/hojasderDesc.png" alt="" width={140} height={240} />
                </div>
                <div className='products-container'>
                    <ProductCard />
                </div>
                <div className='hojas'>
                    <img className='hojasIzquierda' src="/images/hojasizqDesc.png" alt="" width={200} height={255} />
                    <img className='hojasDerecha' src="/images/hojasderDesc.png" alt="" width={140} height={240} />
                </div>
                <h2 className="tittlecalificaciones">Calificaciones del mercado</h2>

                <h2 className="tittlecalificaciones">Opiniones</h2>
                <div className="reviews-container">
                    <div className="calificacion">
                        <h2>4.5</h2>
                        <img src="/images/calificaciones.png" alt="" width={200} />
                    </div>
                    
                    <div>
                        <Comentarios
                            comments={comments}
                            onAddComment={handleAddComment}
                        />
                    </div>

                </div>

                <hr className='hr' />
            </div>
            <Footer />
        </>
    );
};











// import React from 'react'
// import './MarketProfileClient.css'
// import Reviewcard from '../ReviewCard/Reviewcard';
// import { Footer } from '../Footer/Footer';
// import Header from '../Header/Header'
// import { ProductCard } from '../ProductCard/ProductCard';

// export const MarketProfileClient = () => {

//     const [comments, setComments] = useState([]);

//     const handleAddComment = (e) => {
//         e.preventDefault();
//         const commentText = e.target.value.trim();
//         if (commentText !== "") {
//             const newComment = {
//                 author: user.nombre, // Asigna el nombre del usuario como autor del comentario
//                 text: commentText,
//             };
//             setComments([...comments, newComment]);
//             e.target.value = ""; // Limpia el campo de entrada después de agregar el comentario
//         }
//     };

//     return (
//         <>
//             <Header />
//             <div className="container-marketProfile">
//                 {/* <div className='button-toEdit'>
//                     <button>Editar perfil</button>
//                 </div> */}
//                 <div className="contprofile">
//                     <section className="profile-absolutemarket">
//                         <div className="perfil-containermarket">
//                             <img className='hojasDerechaprofile' src="/images/hojasderDesc.png" alt="" width={70} height={120} />

//                             <img className="perfil-imgmarket" src='https://i.pinimg.com/564x/fc/5d/5c/fc5d5c16121bb3d34f9efabc441f0a65.jpg' alt="Foto de perfil" />
//                         </div>
//                     </section>
//                     <div className='profile-infomarket'>
//                         <h2>Finca Iberica</h2>
//                         <p>Armenia, Quindio</p>
//                     </div>

//                 </div>
//                 <div className='description-market'>
//                     {/* cristian cambie el texto de p */}
//                     <p>Aqui exhibimos y vendemos una amplia variedad de productos frescos y cultivados localmente, como frutas y verduras de temporada, hierbas aromáticas, hortalizas, huevos, miel, lácteos y carnes de granja. Estos alimentos son cuidadosamente cultivados y cosechados con métodos sostenibles</p>

//                 </div>


//                 <div className='hojas'>
//                     <img className='hojasIzquierda' src="/images/hojasizqDesc.png" alt="" width={200} height={255} />
//                     <img className='hojasDerecha' src="/images/hojasderDesc.png" alt="" width={140} height={240} />
//                 </div>

//                 <div className='products-container'>
//                     <ProductCard />

//                 </div>

//                 <div className='hojas'>
//                     <img className='hojasIzquierda' src="/images/hojasizqDesc.png" alt="" width={200} height={255} />
//                     <img className='hojasDerecha' src="/images/hojasderDesc.png" alt="" width={140} height={240} />
//                 </div>

//                 <h2 className="tittlecalificaciones">Calificaciones y opiniones</h2>

//                 <div className="reviews-container">
//                     <div className="calificacion">
//                         <h2>4.5</h2>
//                         <img src="/images/calificaciones.png" alt="" width={200} />
//                     </div>
//                     <div>
//                         <p className='comments'>Comentarios: <span>{comments.length}</span></p>
//                         {comments.map((comment, index) => (
//                             <div key={index} className="comment">
//                                 <p><strong>{comment.author}:</strong> {comment.text}</p>
//                             </div>
//                         ))}
//                         <div className='Send-comment'>
//                             <input type="text" placeholder='Escribe una reseña' onKeyPress={(e) => e.key === 'Enter' ? handleAddComment(e) : null} />
//                         </div>
//                     </div>
//                 </div>


//                 <hr className='hr' />

//             </div>
//             <Footer />
//         </>

//     )
// }
