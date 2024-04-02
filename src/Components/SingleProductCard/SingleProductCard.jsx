import { IconHeart } from "@tabler/icons-react";
import { SERVER_URL } from "../../Constants";
import { addToCart } from "../../store/slices/cart";
import "./SingleProductCard.css"
import updateLikes from "../../utils/updateLikes";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "../Input/Input";

export const SingleProductCard = ({ idProducto, nombre, isLiked, precio, imagen, isSeller, userId }) => {
    const navigator = useNavigate()
    const [isEditting, setIsEditing] = useState(false)
    const handleEditClick = () => {
        setIsEditing(!isEditting)
    }
    const handleLikeClick = async () => {
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
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("submitting")
        const formData = new FormData(e.currentTarget)
        const cantidad = formData.get("cantidad")
        const precio = formData.get("precio")

        const body = {
            existencia: cantidad, precio, IDProducto: idProducto

        }

        try {
            console.log(body)
            const response = await fetch(`${SERVER_URL}Producto/EditarProducto`, {

                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })


            console.log(await response.json())

            if (!response.ok) throw new Error("hubo un error al actualizar el producto")

        } catch (err) {
            console.error(err)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Hubo un error al actualizar el producto",
                timer: 5000,
                width: 300,
                heightAuto: false
            })
        }


    }

    const handleRemoveClick = async () => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar este producto?')) return;

        try {
            const response = await fetch(`${SERVER_URL}Producto/EliminarProducto/${idProducto}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idProducto }),
            });
            const data = await response.json();
            if (data && data.mensaje === 'ok') {

                console.log('Producto eliminado:', { idProducto });

            } else {
                console.error('Hubo un error al eliminar el producto:', data);
            }
        } catch (error) {
            console.error('Hubo un error en la solicitud:', error);
        }
    }

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
                                    <button className='button-edit' onClick={handleEditClick}>Editar</button>
                                    <button className='button-remove' onClick={handleRemoveClick}>Eliminar</button>
                                </>
                            )
                            : <button className='button-addToCartIcon' onClick={handleAddToCart}>Agregar</button>
                    }
                </div>
            </article>
            {isEditting && (
                <div className="popover" onClick={(e) => e.stopPropagation()}>
                    <h2>Editar Producto</h2>
                    <form onSubmit={handleSubmit}>
                        <Input name="cantidad" type="number" label="cantidad" required placeholder="cantidad: 0" />
                        <Input name="precio" type="number" label="precio" required placeholder="2700$" />
                        <button onClick={handleEditClick}>Cancelar</button>
                        <button type="submit" >Guardar</button>
                    </form>
                </div>
            )}
        </div>
    );
}