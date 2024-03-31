import { IconHeart } from "@tabler/icons-react";
import { SERVER_URL } from "../../Constants";
import { addToCart } from "../../store/slices/cart";
import "./SingleProductCard.css"
import { updateLikes } from "../../store/slices/likes";

export const SingleProductCard = ({ idProducto, nombre, isLiked, precio, imagen, isSeller, userId }) => {

    const handleLikeClick = async () => {
        if (!userId) {
            alert('Debes iniciar sesión para guardar productos como favoritos.');
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
            updateLikes({ payload: userId })
        } catch (error) {
            console.error('Hubo un error en la solicitud:', error);
        }
    }

    const handleAddToCart = () => {
        if (!userId) {
            alert('Debes iniciar sesión para agregar productos al carrito.');
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

    const handleEditClick = (product) => {
        setEditingProduct(product); // Establecer el producto en edición
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
                        <IconHeart size={24} color="red" fill={isLiked ? 'red' : 'none'} />
                    </button>
                )}
                <img className='image_product' src={imagen} alt={nombre} />
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
            {/* {editingProduct === productItem && (
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
            )} */}
        </div>
    );
}