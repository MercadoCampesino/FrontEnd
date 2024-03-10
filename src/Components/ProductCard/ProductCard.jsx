// ProductCard.js
import React, { useState, useEffect } from 'react';
import { AddToCartIcon } from '../Icon';
import './Product.css';

const ProductCard = ({ addToCart }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const url = "https://mercadocampesino.azurewebsites.net/";
                const response = await fetch(`${url}/Producto/ListaProducto`);
                const data = await response.json();
                if (data && data.mensaje === 'ok') {
                    setProducts(data.response);
                    setLoading(false);
                } else {
                    console.error('Hubo un error al obtener los productos.');
                }
            } catch (error) {
                console.error('Hubo un error en la solicitud:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            {loading ? (
                <h3>Cargando...</h3>
            ) : (
                products.slice(0, 12).map((product) => (
                    <figure key={product.idProducto}>
                        <div className='card_product'>
                            <img className='image_product' src={product.imagen} alt={product.nombre} />
                            <p className='name_product'>{product.nombre}</p>
                            <p className='price_discount'><strong>Precio: </strong><em> $</em> {product.precio} 1Kg</p>
                            <div>
                                <button className='button-addToCartIcon' onClick={() => props.addToCart(product)}>Agregar
                                    <AddToCartIcon />
                                </button>
                            </div>
                        </div>
                    </figure>
                ))
            )}
        </>
    );
}

export default ProductCard;
