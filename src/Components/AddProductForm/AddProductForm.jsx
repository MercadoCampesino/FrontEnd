import React, { useState, useEffect } from "react";
import "./AddProductForm.css";

function AddProductForm({ onSubmit }) {
    const [imagen, setImagen] = useState(null);
    const [nombre, setNombre] = useState("");
    const [categoria, setCategoria] = useState("");
    const [precio, setPrecio] = useState("");
    const [existenia, setExistencia] = useState("");
    const [categories, setCategories] = useState([]);


    //   useEffect(() => {
    //     // Aquí puedes hacer una solicitud al backend para obtener la lista de categorías disponibles
    //     // Ejemplo de cómo obtener las categorías desde una API:
    //     fetch("http://MercadoCampesinoBack.somee.com/Categoria/ListaCategoria")
    //       .then(response => response.json())
    //       .then(data => setCategories(data))
    //       .catch(error => console.error('Error al obtener las categorías:', error));
    //   }, []);}



    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://MercadoCampesinoBack.somee.com/Categoria/ListaCategoria");
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        fetchData();
    }, []);




    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                nombre: nombre,
                categoria: categoria,
                precio: precio,
                existencia: parseInt(existencia),
            };

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            };

            const response = await fetch("http://MercadoCampesinoBack.somee.com/Producto/GuardarProducto", requestOptions);
            if (!response.ok) {
                throw new Error('Error al crear el producto');
            }
            const data = await response.json();
            console.log("Producto creado exitosamente:", data);
            onSubmit();
        } catch (error) {
            console.error("Error al crear el producto:", error);
        }
    };

    return (

        <div className="cont-form-add-product">
 <div>
            {Array.isArray(data) && data.length > 0 ? (
                <ul>
                    {data.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            ) : (
                <p>No se encontraron datos</p>
            )}
        </div>
    );
            <form onSubmit={handleSubmit}>
                <label>
                    Subir imagen:
                    <input
                        type="file"
                        onChange={(e) => setImagen(e.target.files[0])}
                    />
                </label>


                <label>
                    Nombre del producto:
                    <input
                        type="text"
                        onChange={(e) => setNombre(e.target.value)}
                        value={nombre}
                    />
                </label>

                <label>
                    Categoría:
                    <select
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                    >
                        <option value="">Seleccionar categoría</option>
                        {categories.length > 0 ? (
                            categories.map(cat => (
                                <option key={cat.IDCategoria} value={cat.tipo}>
                                    {cat.tipo} - {cat.descripcion}
                                </option>
                            ))
                        ) : (
                            <option value="" disabled>
                                Cargando categorías...
                            </option>
                        )}
                    </select>
                </label>



                <label>
                    Precio:
                    <input
                        type="number"
                        onChange={(e) => setPrecio(e.target.value)}
                        value={precio}
                    />
                </label>

                <label>
                    Cantidad:
                    <input
                        type="number"
                        onChange={(e) => setExistencia(e.target.value)}
                        value={existenia}
                    />
                </label>

                <div className="button-Create-Product">
                    <button type="submit">Crear producto</button>
                </div>
            </form>
        </div>
    );
}

export default AddProductForm;








// import React, { useState } from "react";
// import "./AddProductForm.css";

// function AddProductForm({ onSubmit }) {
//   const [image, setImage] = useState(null);
//   const [productName, setProductName] = useState("");
//   const [category, setCategory] = useState("");
//   const [price, setPrice] = useState("");
//   const [quantity, setQuantity] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = {
//         productName: productName,
//         category: category,
//         price: price,
//         quantity: quantity,
//       };

//       const requestOptions = {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       };

//       const response = await fetch("http://MercadoCampesinoBack.somee.com/Producto/GuardarProducto", requestOptions);
//       if (!response.ok) {
//         throw new Error('Error al crear el producto');
//       }
//       const data = await response.json();
//       console.log("Producto creado exitosamente:", data);
//       onSubmit();
//     } catch (error) {
//       console.error("Error al crear el producto:", error);
//     }
//   };

//   return (
//     <div className="cont-form-add-product">
//       <form onSubmit={handleSubmit}>
//         <label>
//           Subir imagen:
//           <input
//             type="file"
//             onChange={(e) => setImage(e.target.files[0])}
//           />
//         </label>

//         <label>
//           Nombre del producto:
//           <input
//             type="text"
//             onChange={(e) => setProductName(e.target.value)}
//             value={productName}
//           />
//         </label>

//         <label>
//           Categoría:
//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <option value="">Seleccionar categoría</option>
//             <option value="Frutas">Frutas</option>
//             <option value="verduras">Verduras</option>
//             <option value="Granos">Granos</option>
//           </select>
//         </label>

//         <label>
//           Precio:
//           <input
//             type="number"
//             onChange={(e) => setPrice(e.target.value)}
//             value={price}
//           />
//         </label>

//         <label>
//           Cantidad:
//           <input
//             type="number"
//             onChange={(e) => setQuantity(e.target.value)}
//             value={quantity}
//           />
//         </label>

//         <div className="button-Create-Product">
//           <button type="submit">Crear producto</button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default AddProductForm;