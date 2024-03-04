import React, { useState } from "react";
import Reviewcard from '../ReviewCard/Reviewcard';
import ProductCard from '../ProductCard/ProductCard';
// import markets from '../.././assets/Markets/markets';
import Header from '../Header/Header';
import './MarketProfile.css'
import { Footer } from '../Footer/Footer';
import AddProductForm from '../AddProductForm/AddProductForm';

export default function ProfileMarket() {
    const [showForm, setShowForm] = useState(false);

    const handleCreateProduct = (productData) => {
        // Aquí puedes enviar los datos del producto a tu backend o hacer lo que necesites
        console.log("Nuevo producto:", productData);
        // Cerrar el formulario después de enviar los datos
        setShowForm(false);
    };

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
                    {/* cristian remplace este div */}
                    <div className='MarketProfile'>
                        <h2>Nombre de la tienda</h2>
                        <p>Direccion de la tienda</p>
                    </div>
                </div>

                <div className='description-market'>
                    {/* cristian cambie el texto de p */}
                    <p>Aqui exhibimos y vendemos una amplia variedad de productos frescos y cultivados localmente, como frutas y verduras de temporada, hierbas aromáticas, hortalizas, huevos, miel, lácteos y carnes de granja. Estos alimentos son cuidadosamente cultivados y cosechados con métodos sostenibles</p>

                </div>

                <div className="add_product">
                    {/* cristian añada la el clasName de button */}
                    <button className="addProduct-button" onClick={() => setShowForm(true)}>Crear nuevo producto</button>

                    {showForm && (
                        <div className="floating-form-container">
                            <div className="floating-form">
                                <button className="close-button" onClick={() => setShowForm(false)}>
                                    X
                                </button>
                                <AddProductForm onSubmit={handleCreateProduct} />
                            </div>
                        </div>
                    )}
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



                    <div className='Send-comment'>
                        <input type="text" placeholder='Escribe una reseña' />
                        <button>Ver mas...</button>
                    </div>
                </div>

                <hr className='hr' />

            </div>
            <Footer />
        </>
    )
}
