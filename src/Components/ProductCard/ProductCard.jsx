import React, { useState, useEffect, useContext } from 'react';
import { AddToCartIcon } from '../Icon';
import './Product.css';
import { SERVER_URL } from '../../Constants';
import { useCart } from '../Shopping/CartContext';
export const ProductCard = () => {
    const { addToCart } = useCart();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const handleClick = (product) => {
        addToCart(product);
    }
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${SERVER_URL}Producto/ListaProducto`);
                const data = await response.json();
                if (data && data.mensaje === 'ok') {
                    setProducts(data.response);
                    console.log('Productos:', data.response);
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
                products.slice(0, 12).map((productItem) => (
                    <figure key={productItem.idProducto}>
                        <div className='card_product'>
                            <img className='image_product' src={productItem.imagen} alt={productItem.nombre} />
                            <p className='name_product'>{productItem.nombre}</p>
                            <p className='price_discount'><strong>Precio: </strong><em> $</em> {productItem.precio} 1Kg</p>

                            <div className='agregarbotona'>
                                <button className='button-addToCartIcon' onClick={
                                    () => handleClick(productItem)
                                }>
                                    <AddToCartIcon />
                                    <p>Agregar</p>
                                </button>
                            </div>
                        </div>
                    </figure>
                ))
            )}
        </>
    );
}

