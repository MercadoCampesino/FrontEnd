import React, { useState, useEffect } from 'react';
import './Product.css';
import { SERVER_URL } from '../../Constants';
import { useSelector } from 'react-redux';
import { useCart } from '../Shopping/CartContext';
import { IconHeart } from '@tabler/icons-react';
import { store } from '../../store';
import { setLikes } from '../../store/slices/likes';
export const ProductCard = () => {
    const { addToCart } = useCart();
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
    const handleRemoveClick = async (product) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            try {
                const response = await fetch(`${SERVER_URL}Producto/EliminarProducto/${product.idProducto}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ idProducto: product.idProducto }),
                });
                const data = await response.json();
                window.location.reload();
                if (data && data.mensaje === 'ok') {
                    console.log('Producto eliminado:', product);
                // Actualizar la lista de productos después de eliminar
                    fetchProducts();

                } else {
                    console.error('Hubo un error al eliminar el producto:', data);
                }
            } catch (error) {
                console.error('Hubo un error en la solicitud:', error);
            }
        }
    }

    const handleClick = (product) => {
        if (!user) {
            alert('Debes iniciar sesión para agregar productos al carrito.');
        } else {
            addToCart(product);
            alert('El producto se ha agregado al carrito.');
        }
    }

    const handleEditClick = (product) => {
        setEditingProduct(product); // Establecer el producto en edición
    }

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
    const handleLikeClick = async (productId, isLiked) => {
        let url = isLiked?  `${SERVER_URL}Favoritos/EliminarFavoritos/${user.IDCliente}/${productId}`: `${SERVER_URL}Favoritos/GuardarFavoritos`;
        try {
            const userId = user.IDCliente;
            const response = await fetch(url, {
                method: isLiked ? 'DELETE' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ FK_IDProducto1: productId, FK_IDCliente1: userId }),
            });
            if (!response.ok) {
                throw new Error('Error al guardar el producto como favorito');
            }
            const data = await response.json();
            console.log('Producto guardado como favorito:', productId);
            const response2 = await fetch(`${SERVER_URL}Favoritos/ListarFavoritosPorPersona?FK_IDCliente1=${userId}`);
            const data2 = await response2.json();
            store.dispatch(setLikes(data2.response));

        } catch (error) {
            console.error('Hubo un error en la solicitud:', error);
        }

    }
    return (
        <>
            {loading ? (
                <h3>Cargando...</h3>
            ) : (
                products.map((productItem) => (
                    <div key={productItem.idProducto}>
                        <div className='card_product'>
                            <div className='heart'>
                            <button  onClick={() => handleLikeClick(productItem.idProducto, likedProducts?.find(el => el.idProducto == productItem.idProducto))} className="like-wrapper">
                                <IconHeart size={24} color="red" fill={likedProducts?.find(el => el.idProducto == productItem.idProducto) ? 'red' : 'none'} />

                            </button>
                            </div>
                            <img className='image_product' src={productItem.imagen} alt={productItem.nombre} />
                            <p className='name_product'>{productItem.nombre}</p>
                            <p className='price_discount'><strong>Precio: </strong><em> $</em> {productItem.precio} 1Kg</p>
                            <div className='agregarbotona'>
                                {!user?.idTienda && (
                                    <button className='button-addToCartIcon' onClick={() => handleClick(productItem)}>
                                        <p>Agregar</p>
                                    </button>
                                )}
                                {user?.idTienda && (
                                    <>
                                        <button className='button-edit' onClick={() => handleEditClick(productItem)}>
                                            <p>Editar</p>
                                        </button>
                                        <button className='button-remove' onClick={() => handleRemoveClick(productItem)}>
                                            <p>Eliminar</p>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                        {editingProduct === productItem && (
                            <div className="popover" onClick={(e) => e.stopPropagation()}>
                                <h2>Editar Producto</h2>
                                <form onSubmit={(e) => e.preventDefault()}>
                                    <label htmlFor="precio">Precio:</label>
                                    <input type="number" id="precio" value={editedFields.precio} onChange={(e) => handleEditChange('precio', e.target.value)} />
                                    <label htmlFor="cantidad">Cantidad:</label>
                                    <input type="number" id="cantidad" value={editedFields.cantidad} onChange={(e) => handleEditChange('cantidad', e.target.value)} />
                                    <button onClick={handleEditCancel}>Cancelar</button>
                                    <button onClick={() => handleEditSubmit(editedFields)}>Guardar</button>
                                </form>
                            </div>
                        )}
                    </div>
                ))
            )}
        </>
    );
}




