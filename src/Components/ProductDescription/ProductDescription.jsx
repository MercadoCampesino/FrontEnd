import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../../assets/Products/products';
import { Footer } from '../Footer/Footer';

function ProductDescription() {
    const { id } = useParams();
    const product = products.find(product => product.id === parseInt(id));

    if (!product) {
        return <div>Producto no encontrado</div>;
    }

    return (

        <>
            <div>
                <div>
                    <h2>{product.name}</h2>
                    <img src={product.image} alt={product.name} />
                    <p>Precio: ${product.price}</p>
                    {/* Agrega más detalles del producto según sea necesario */}
                </div>
            </div>

            <Footer/>
        </>
    );
}

export default ProductDescription;




// import React from 'react';
// import { useParams } from 'react-router-dom';
// import products from '../../assets/Products/products';
// import SimilarProducts from '../SimilarProducts/SimilarProducts';

// function ProductDescription() {
//     const { id } = useParams();
//     const product = products.find(product => product.id === parseInt(id));

//     if (!product) {
//         return <div>Producto no encontrado</div>;
//     }

//     return (
//         <div>
//             <div>
//                 <h2>{product.name}</h2>
//                 <img src={product.image} alt={product.name} />
//                 <p>Precio: ${product.price}</p>
//                 {/* Agrega más detalles del producto según sea necesario */}
//             </div>
//             <SimilarProducts productId={parseInt(id)} />
//         </div>
//     );
// }

// export default ProductDescription;



// ProductDescription.js
// import React from 'react';
// import { useParams } from 'react-router-dom'; // Importa useParams para obtener los parámetros de la URL
// import products from '../../assets/Products/products';
// import ProductCard from '../ProductCard/ProductCard';

// function ProductDescription() {
//     const { id } = useParams(); // Obtiene el id del producto de los parámetros de la URL
//     const product = products.find(product => product.id === parseInt(id));

//     if (!product) {
//         return <div>Producto no encontrado</div>;
//     }

//     return (

//         <>
//             <div>
//                 <h2>{product.name}</h2>
//                 <img src={product.image} alt={product.name} />
//                 <p>Precio: ${product.price}</p>
//                 {/* Agrega más detalles del producto según sea necesario */}
//             </div>
//         </>
//     );
// }

// export default ProductDescription;



// import React, { useState } from 'react';
// import ProductDetails from '../ProductDetails/ProductDetails';
// import SimilarProducts from '../SimilarProducts/SimilarProducts';

// function ProductDescription() {
//     const [selectedProduct, setSelectedProduct] = useState(null);

//     // Función para manejar el clic en una tarjeta de producto
//     const handleProductClick = (productId) => {
//         setSelectedProduct(productId);
//     };

//     return (
//         <div>
//             {selectedProduct ? (
//                 <>
//                     <ProductDetails productId={selectedProduct} />
//                     <SimilarProducts productId={selectedProduct} />
//                 </>
//             ) : (
//                 <ProductCard onProductClick={handleProductClick} />
//             )}
//         </div>
//     );
// }

// export default ProductDescription;
