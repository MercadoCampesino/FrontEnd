import React, { useState, useEffect } from 'react';
import './Product.css';
import { SERVER_URL } from '../../Constants';
import { useSelector } from 'react-redux';
import { IconHeart } from '@tabler/icons-react';
import { store } from '../../store';
import { SingleProductCard } from '../SingleProductCard/SingleProductCard';
export const ProductCard = ({ passedProducts }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = useSelector((state) => state?.user?.user);
    const likedProducts = useSelector((state) => state.likes?.likes);




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
    }, [likedProducts]);

    return (
        <>
            {loading ? (
                <h3>Cargando...</h3>
            ) : (
                (passedProducts ? passedProducts : products).map((productItem) => (
                    <SingleProductCard
                        {...productItem}
                        key={productItem.idProducto}
                        idProducto={productItem.idProducto}
                        userId={user?.IDCliente}
                        isSeller={user?.idTienda != null}
                        isLiked={likedProducts.some((likedProduct) => likedProduct.idProducto === productItem.idProducto)}

                    />
                ))
            )}
        </>
    );
}