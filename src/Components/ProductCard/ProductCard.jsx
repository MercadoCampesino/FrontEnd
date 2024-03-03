// ProductCard.js
import React, { useState, useEffect } from 'react';
import { AddToCartIcon } from '../Icon';
import './Product.css';

export function ProductList({ idProducto, nombre, existencia, precio, imagen }) {
    return (
        <figure>
            <div className='card_product' key={idProducto}>
                <img className='image_product' src={imagen} alt={nombre} />
                <p className='name_product'>{nombre}</p>
                <p className='price_discount'><strong>Ahora: </strong><em>$</em> {precio}</p>
                <div>
                    <button>
                        <AddToCartIcon />
                    </button>
                </div>
            </div>
        </figure>
    );
}

function ProductCard() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const url = "http://MercadoCampesinoBack.somee.com";
                const response = await fetch(`${url}/Producto/ListaProducto`);
                const data = await response.json();
                if (data && data.mensaje === 'ok') {
                    setProducts(data.response);
                } else {
                    console.error('Hubo un error al obtener los productos.');
                }
            } catch (error) {
                console.error('Hubo un error en la solicitud:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            {products.length === 0 ? (
                <h3>Cargando...</h3>
            ) : (
                products.slice(0, 12).map((product) => (
                    <ProductList
                        key={product.idProducto}
                        idProducto={product.idProducto}
                        nombre={product.nombre}
                        existencia={product.existencia}
                        precio={product.precio}
                        imagen={product.imagen}
                    />
                ))
            )}
        </>
    );
}

export default ProductCard;







// import React, { useState, useEffect } from 'react';
// import { AddToCartIcon } from '../Icon'; 
// // import { Link } from 'react-router-dom';
// import './Product.css';

// function Product({ idProducto, nombre, existencia, precio, imagen }) {
//     return (
//         <figure>
//             <div className='card_product' key={idProducto}>
//                 <img className='image_product' src={imagen} alt={nombre} />
//                 <p className='name_product'>{nombre}</p>
//                 {/* <p>{existencia}</p> */}
//                 <p className='price_discount'><strong>Ahora: </strong><em>$</em> {precio}</p>

//                 <div>
//                     <button>
//                         <AddToCartIcon />
//                     </button>
//                 </div>
//             </div>
//         </figure>
//     );
// }

// function ProductCard() {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         const url = "http://MercadoCampesinoBack.somee.com";

//         fetch(`${url}/Producto/ListaProducto`)
//             .then(res => res.json())
//             .then((data) => {
//                 if (data && data.mensaje === 'ok') {
//                     setProducts(data.response);
//                 } else {
//                     console.error('Hubo un error al obtener los productos.');
//                 }
//             })
//             .catch(error => {
//                 console.error('Hubo un error en la solicitud:', error);
//             });
//     }, []);

//     return (
//         <>
//             {products.length === 0 ? (
//                 <h3>Cargando...</h3>
//             ) : (
//                 products.slice(0, 12).map((product) => (
//                     // <Link className='a_card' to={`/ProductDescription/${product.idProducto}`} key={product.idProducto}>
//                         <Product
//                             key={product.idProducto}
//                             idProducto={product.idProducto}
//                             nombre={product.nombre}
//                             existencia={product.existencia}
//                             precio={product.precio}
//                             imagen={product.imagen}
//                         />
//                     // </Link>
//                 ))
//             )}
//         </>
//     );
// }

// export default ProductCard;