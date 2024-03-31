import React, { useState, useEffect } from 'react';
import './Product.css';
import { SERVER_URL } from '../../Constants';
import { useSelector } from 'react-redux';
import { IconHeart } from '@tabler/icons-react';
import { store } from '../../store';
import { SingleProductCard } from '../SingleProductCard/SingleProductCard';
export const ProductCard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState(null); // Estado para controlar el producto en edición
    const user = useSelector((state) => state?.user?.user);
    const [likedProducts, setLikedProducts] = useState([]);

    store.subscribe(() => {
        const likes = store.getState().likes;
        console.log(likes)
        setLikedProducts(likes.likes);
    });



    const handleEditCancel = () => {
        setEditingProduct(null); // Cancelar la edición del producto
    }

    const handleEditSubmit = async (updatedProduct) => {
        if (!updatedProduct || !updatedProduct.idProducto) {
            console.error('El producto a editar es inválido.');
            return;
        }

        try {
            const response = await fetch(`${SERVER_URL}Producto/EditarProducto/${updatedProduct.idProducto}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });
            if (!response.ok) {
                throw new Error('Error al editar el producto');
            }
            const data = await response.json();
            if (data && data.mensaje === 'ok') {
                console.log('Producto editado:', updatedProduct);
                fetchProducts(); // Actualizar la lista de productos
                setEditingProduct(null); // Cancelar edición después de guardar
            } else {
                console.error('Hubo un error al editar el producto:', data);
            }
        } catch (error) {
            console.error('Hubo un error en la solicitud:', error);
        }
    }


    const [editedFields, setEditedFields] = useState({
        nombre: '',
        precio: '',
        imagen: '',
        cantidad: '',
    });


    const handleEditChange = (field, value) => {
        setEditedFields({
            ...editedFields,
            [field]: value
        });
    };


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
                products.map((productItem) => (
                    <SingleProductCard
                        {...productItem}
                        key={productItem.idProducto}
                        idProducto={productItem.idProducto}
                        userId={user?.IDCliente}
                        isSeller={user?.idTienda != null}
                        isLiked={likedProducts.some((likedProduct) => likedProduct.FK_IDProducto1 === productItem.idProducto)}

                    />
                ))
            )}
        </>
    );
}




