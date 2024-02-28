import React from 'react'
import Reviewcard from '../ReviewCard/Reviewcard';
import ProductCard from '../ProductCard/ProductCard';
// import markets from '../.././assets/Markets/markets';
import Header from '../Header/Header';
import './MarketProfile.css'
import { Footer } from '../Footer/Footer';

export default function ProfileMarket() {

    const reviews = [
        {
            author: 'Jessica Gomez',
            text: 'Excelentes productos, de muy buena calidad... Quedé encantada',
        },
        {
            author: 'Sergio Lopez',
            text: 'Muy buenos los productos para muy demorada la entrega',
        },
        {
            author: 'Elvia Martinez',
            text: 'Muy buenos precios y la calidad excelente',
        },


    ];

    return (
        <>
            <Header />
            <div className="container-marketProfile">
                <div className='button-toEdit'>
                    <button>Editar perfil</button>
                </div>

                <div>
                    <div className='MarketProfile'>
                        <h2>nombre</h2>
                        <p>Direccion</p>
                    </div>
                </div>

                <div className='description-market'>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est provident dolorem harum nam quae placeat amet nobis tempora neque repudiandae. Id quibusdam iste iure accusamus nostrum, alias recusandae sapiente sit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, quae! Dicta amet saepe quas cupiditate repellendus rerum libero, nisi dignissimos ipsa corrupti illo odit consequuntur, reiciendis fuga esse quibusdam eveniet.</p>
                </div>

                <div>
                    <button>Crear nuevo producto</button>
                </div>

                <div className="products-container">
                    <ProductCard />
                </div>

                <div className="reviews-container">
                    <h2>Calificacions y opiniones</h2>
                    <p className='comments'>Comentarios: <span>24</span></p>

                    {reviews.map((review) => (
                        <Reviewcard key={review.author} review={review} />
                    ))}

                    

                    <div  className='Send-comment'>
                        <input type="text" placeholder='Escribe una reseña'/>
                        <button>Ver mas...</button>
                    </div>
                </div>

                <hr className='hr' />

            </div>
            <Footer />
        </>
    )
}
