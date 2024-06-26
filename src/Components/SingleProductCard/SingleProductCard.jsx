import { IconHeart } from "@tabler/icons-react";
import { SERVER_URL } from "../../Constants";
import { } from "../../store/slices/cart";
import "./SingleProductCard.css"
import updateLikes from "../../utils/updateLikes";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCart } from "../Shopping/CartContext";
import { useState } from "react";
import { Input } from "../Input/Input";
export const SingleProductCard = ({ idProducto, nombre, isLiked, precio, imagen, isSeller, userId }) => {
    const navigator = useNavigate()
    const [isEditting, setIsEditing] = useState();
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const cantidad = formData.get('cantidad');
        const precio = formData.get('precio');
        const IDProducto = idProducto;
        try {
            const response = await fetch(`${SERVER_URL}Producto/EditarProducto`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cantidad, precio, IDProducto }),
            });
            const data = await response.json();
            if (response.ok) {
                Swal.fire({
                    title: '¡Actualizado!',
                    text: 'El producto ha sido actualizado.',
                    icon: 'success',
                    timer: 3000, // Mostrar el mensaje por 5 segundos
                    timerProgressBar: true,
                    showConfirmButton: false // Ocultar el botón de confirmación
                });
                // Recargar la página después de actualizar el producto
                setTimeout(() => {
                    window.location.reload();
                }, 3000); // Recargar la página después de 5 segundos
            } else {
                console.log({ data, response })
                Swal.fire(
                    'Error',
                    'Hubo un error al actualizar el producto.',
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
                position: "top-end",
                title: "Producto agregado al carrito.",
                showConfirmButton: false,
                width: 200,
                heightAuto: false,
                timerProgressBar: true,
                timer: 1500,
                customClass: {
                    title: 'small-title',
                    icon: 'small-icon',
                    timerProgressBar: 'small-timerProgressBar'
                }
            });
        }
    }

    const handleEditClick = () => {
        setIsEditing(!isEditting)
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
                <p className='price_discount'><strong>Precio: </strong><em> $</em> {precio} COP 1Kg</p>
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
                {isEditting && (
                    <div className="popoveredit" onClick={(e) => e.stopPropagation()}>
                        <h2>Editar Producto</h2>
                        <form onSubmit={handleSubmit}>
                            <Input className='input' name="cantidad" type="number" label="Cantidad" required placeholder="Escriba la cantidad actualizada" />
                            <Input className='input' name="precio" type="number" label="Precio" required placeholder="Escriba el precio actualizado" />
                            <div className="botonesedit">
                                <button className="cancelaredit" onClick={handleEditClick}>Cancelar</button>
                                <button className="guardaredit" type="submit" >Guardar</button>
                            </div>
                        </form>
                    </div>
                )}
            </article>
            { }
        </div>
    );
}
/* {editingProduct === productItem && (
                <div className="popover" onClick={(e) => e.stopPropagation()}>
                    <h2>Editar Producto</h2>
                    <form onSubmit={handleSubmit}>
                        <Input name="cantidad" type="number" label="cantidad" required placeholder="cantidad: 0" />
                        <Input name="precio" type="number" label="precio" required placeholder="2700$" />
                        <button onClick={handleEditClick}>Cancelar</button>
                        <button type="submit" >Guardar</button>
                    </form>
                </div>
            )} */