import React, { useState, useEffect, useRef, useMemo } from "react";
import "./AddProductForm.css"
import { SERVER_URL } from "../../Constants";
import { Input } from "../Input/Input"
import { useSelector } from "react-redux";

function AddProductForm({ callback }) {
    const [categories, setCategories] = useState([]);

    const user = useSelector((state) => state.user.user);
    const fetchData = useMemo(() => async function () {
        try {
            const response = await fetch(SERVER_URL + "Categoria/ListaCategoria");
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            const data = await response.json();
            setCategories(data.response);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    }, []);
    useEffect(() => {

        fetchData();
    }, []);

    const [file, setFile] = useState(null)
    const handleSudmit = async (e) => {
        e.preventDefault();
        try {
            const result = await uploadFile(file);
            console.log(result);
        } catch (error) {
            console.error(error);
            alert('fallo al subir, intente mas tarde')
        }

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.currentTarget);

            const nombre = formData.get('nombre');
            const precio = Number(formData.get('precio'));
            const existencia = Number(formData.get('cantidad'));
            const IDCategoria = Number(formData.get('IDCategoria'));
            const imagen = "";
            const FK_IDTienda = Number(user.idTienda);


            const producto = {
                nombre,
                existencia,
                precio,
                imagen,
                FK_IDTienda,
                FK_IDCategoria: IDCategoria,
                IdProducto: Math.floor(Math.random() * 100000) + 1
            };
            console.log("Producto a crear:", producto);

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto)
            };

            const response = await fetch(SERVER_URL + "Producto/GuardarProducto", requestOptions);
            if (!response.ok) {
                console.error(await response.json());
                throw new Error("Error al crear el producto");
            }
            const data = await response.json();
            alert("Producto creado exitosamente");
            console.log("Producto creado exitosamente:", data);
        } catch (error) {
            alert(error.message);
        } finally {
            callback();
        }
    };

    return (
        <form className="cont-form-add-product" onSubmit={handleSubmit}>
            <label>
                Subir imagen:
                <input type="file" name="" id="" onChange={e => setFile(e.target.files[0])} />
            </label>

            <Input type="text" name="nombre" label="Nombre del producto" />

            <label className="input-base">
                Categoría:
                <select
                    name="IDCategoria"
                >
                    <option value="">Seleccionar categoría</option>
                    {
                        categories.length > 0 ? (
                            categories.map(cat => (
                                <option key={cat.idCategoria} value={cat.idCategoria}>
                                    {cat.tipo}
                                </option>
                            ))
                        ) : (
                            <option value="" disabled>
                                Cargando categorías...
                            </option>
                        )
                    }
                </select>
            </label>



            <Input type="number" name="precio" label="Precio" />

            <Input type="text" name="cantidad" label="Cantidad" />


            <button className="create-product-button" type="submit">Crear producto</button>
        </form>
    );
}

export default AddProductForm;



