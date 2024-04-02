import { IconHeart } from "@tabler/icons-react";
import { SERVER_URL } from "../../Constants";
import { } from "../../store/slices/cart";
import "./SingleProductCard.css"
import updateLikes from "../../utils/updateLikes";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCart } from "../Shopping/CartContext";
export const SingleProductCard = ({ idProducto, nombre, isLiked, precio, imagen, isSeller, userId }) => {
    const navigator = useNavigate()
    const { addToCart } = useCart()
    const handleLikeClick = async () => {
        console.log(userId)
        if (!userId) {
            Swal.fire({
                icon: "info",
                title: "Oops...",
                text: "Debes iniciar sesión, para guardar productos como favoritos.",
                timer: 5000,
                width: 300,
                heightAuto: false
            });
            return;
        }
        let url = isLiked ? `${SERVER_URL}Favoritos/EliminarFavoritos/${userId}/${idProducto}` : `${SERVER_URL}Favoritos/GuardarFavoritos`;
        let body = isLiked ? undefined : { FK_IDProducto1: idProducto, FK_IDCliente1: Number(userId) };
        console.log({ url, body })
        try {
            const response = await fetch(url, {
                method: isLiked ? 'DELETE' : 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(body),
            });
            console.log(await response.json())
            if (!response.ok) {
                throw new Error('Error al guardar el producto como favorito');
            }
            await updateLikes(userId)
        } catch (error) {
            console.error('Hubo un error en la solicitud:', error);
        }
    }

    const handleAddToCart = () => {
        if (!userId) {
            Swal.fire({
                icon: "info",
                title: "Oops...",
                text: "Debes iniciar sesión para agregar productos al carrito.",
                timer: 5000,
                width: 300,
                heightAuto: false
            });
        } else {
           addToCart({
                idProducto,
                nombre,
                precio,
                imagen,
                cantidad: 1,
            });
            Swal.fire({
                icon: "success",
                title: "¡Producto agregado!",
                text: "El producto ha sido agregado al carrito.",
                timer: 5000,
                width: 300,
                heightAuto: false
            });
        }
    }

    const handleEditClick = (product) => {
        setEditingProduct(product); // Establecer el producto en edición
    }

    const handleRemoveClick = async () => {
        // Mostrar SweetAlert para advertir al usuario
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará el producto permanentemente.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`${SERVER_URL}Producto/EliminarProducto/${idProducto}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ idProducto }),
                    });
                    const data = await response.json();
                    if (response.ok) {
                        Swal.fire({
                            title: '¡Eliminado!',
                            text: 'El producto ha sido eliminado.',
                            icon: 'success',
                            timer: 3000, // Mostrar el mensaje por 5 segundos
                            timerProgressBar: true,
                            showConfirmButton: false // Ocultar el botón de confirmación
                        });
                        // Recargar la página después de eliminar el producto
                        setTimeout(() => {
                            window.location.reload();
                        }, 3000); // Recargar la página después de 5 segundos
                    } else {
                        Swal.fire(
                            'Error',
                            'Hubo un error al eliminar el producto.',
                            'error'
                        );
                    }
                } catch (error) {
                    console.error('Hubo un error en la solicitud:', error);
                    Swal.fire(
                        'Error',
                        'Hubo un error en la solicitud.',
                        'error'
                    );
                }
            }
        });
    };
    return (
        <div>
            <article className='card_product'>
                {!isSeller && (
                    <button onClick={handleLikeClick} className="like-wrapper">
                        <IconHeart className="heart" size={24} color="red" fill={isLiked ? 'red' : 'none'} />
                    </button>
                )}

                <img onClick={() => {
                    navigator(`/product/${idProducto}`)
                }} className='image_product' src={imagen} alt={nombre} />
                <p className='name_product'>{nombre}</p>
                <p className='price_discount'><strong>Precio: </strong><em> $</em> {precio} 1Kg</p>
                <div className='agregarbotona'>
                    {
                        isSeller
                            ? (
                                <>
                                <div className="botones">
                                    <button className='button-edit' onClick={handleEditClick}>Editar</button>
                                    <button className='button-remove' onClick={handleRemoveClick}>Eliminar</button>
                                </div>
                                    
                                </>
                            )
                            : <button className='button-addToCartIcon' onClick={handleAddToCart}>Agregar</button>
                    }
                </div>
            </article>
            {}
        </div>
    );
}/* {editingProduct === productItem && (
                <div className="popover" onClick={(e) => e.stopPropagation()}>
                    <h2>Editar Producto</h2>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="nombre">Nombre:</label>
                        <input type="text" id="nombre" value={editedFields.nombre} onChange={(e) => handleEditChange('nombre', e.target.value)} />
                        <label htmlFor="precio">Precio:</label>
                        <input type="number" id="precio" value={editedFields.precio} onChange={(e) => handleEditChange('precio', e.target.value)} />
                        <label htmlFor="imagen">URL de la Imagen:</label>
                        <input type="text" id="imagen" value={editedFields.imagen} onChange={(e) => handleEditChange('imagen', e.target.value)} />
                        <label htmlFor="cantidad">Cantidad:</label>
                        <input type="number" id="cantidad" value={editedFields.cantidad} onChange={(e) => handleEditChange('cantidad', e.target.value)} />
                        <button onClick={handleEditCancel}>Cancelar</button>
                        <button onClick={() => handleEditSubmit(editedFields)}>Guardar</button>
                    </form>
                </div>
            )} */