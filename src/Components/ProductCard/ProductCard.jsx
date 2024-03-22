import React, { useState, useEffect, useContext } from 'react';
import { AddToCartIcon } from '../Icon';
import './Product.css';
import { SERVER_URL } from '../../Constants';
import { useSelector } from 'react-redux';
import { useCart } from '../Shopping/CartContext';

export const ProductCard = () => {
    const { addToCart } = useCart();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = useSelector((state) => state?.user?.user);


    const handleRemoveClick = async (product) => {
        try {
            const response = await fetch(`${SERVER_URL}Producto/EliminarProducto/${product.idProducto}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idProducto: product.idProducto }),
            });
            const data = await response.json();
            if (data && data.mensaje === 'ok') {
                console.log('Producto eliminado:', product);
            } else {
                console.error('Hubo un error al eliminar el producto:', data);
            }
        } catch (error) {
            console.error('Hubo un error en la solicitud:', error);
        }
    }

    const handleClick = (product) => {
        addToCart(product);
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${SERVER_URL}Producto/ListaProducto`);
                const data = await response.json();
                if (data && data.mensaje === 'ok') {
                    setProducts(data.response.reverse());
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

        //Actualizar productos cada 1 segundo
        const intervalId = setInterval(fetchProducts, 1000);

        // Limpiar intervalo cuando el componente se desmonta o se actualiza
        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            {loading ? (
                <h3>Cargando...</h3>
            ) : (
                products.map((productItem) => (
                    <figure key={productItem.idProducto}>
                        <div className='card_product'>
                            <img className='image_product' src={productItem.imagen} alt={productItem.nombre} />
                            <p className='name_product'>{productItem.nombre}</p>
                            <p className='price_discount'><strong>Precio: </strong><em> $</em> {productItem.precio} 1Kg</p>
                            <div className='agregarbotona'>
                                {!user?.idTienda && (
                                    <button className='button-addToCartIcon' onClick={() => handleClick(productItem)}>
                                        <AddToCartIcon />
                                        <p>Agregar</p>
                                    </button>
                                )}
                                {/* <button className='button-addToCartIcon' onClick={() => handleClick(productItem)}>
                                    <AddToCartIcon />
                                    <p>Agregar</p>

                                </button> */}
                                <div className='divproduct'>
                                {user?.idTienda && <button className='button-remove' onClick={() => handleRemoveClick(productItem)}>
                                    <p className='eliminarproduct'>Eliminar</p>
                                </button>}
                                </div>
                            </div>
                        </div>
                    </figure>
                ))
            )}
        </>
    );
}


