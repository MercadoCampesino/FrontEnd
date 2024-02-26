// import React from 'react'
// import products from '../../assets/Products/products'
// import './Product.css'


// function ProductCard() {

//     const firstFourProducts = products.slice(0, 12);

//     return (
//         <>
//             {firstFourProducts.map((product) => (
//                 <div className='card_product' key={product.id}>
//                     <img className='image' src={product.image} alt="" />
//                         <p className='name_product'>{product.name}</p>
//                         <p className='price_discount'><strong>Ahora: </strong><em>$</em> {product.price}</p>
//                     <input className='buy' type="submit" value="Comprar"></input>
//                 </div>
//             ))}
//         </>
//     )
// }

// export default ProductCard;


// import React from 'react';
// import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom si estás utilizando React Router
// import products from '../../assets/Products/products';
// import './Product.css';

// function ProductCard() {
//     const firstFourProducts = products.slice(0, 12);

//     return (
//         <>
//             {firstFourProducts.map((product) => (
//                 <Link to={`/ProductDescription/${product.id}`} key={product.id}>
//                     <div className='card_product'>
//                         <img className='image' src={product.image} alt="" />
//                         <p className='name_product'>{product.name}</p>
//                         <p className='price_discount'><strong>Ahora: </strong><em>$</em> {product.price}</p>
//                         <input className='buy' type="submit" value="Comprar"></input>
//                     </div>
//                 </Link>
//             ))}
//         </>
//     );
// }

// export default ProductCard;


// ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import products from '../../assets/Products/products';
import './Product.css';

function ProductCard() {
    const firstFourProducts = products.slice(0, 12);

    return (
        <>
            {firstFourProducts.map((product) => (
                <Link className='a_card' to={`/ProductDescription/${product.id}`} key={product.id}>
                    <div className='card_product'>
                        <img className='image' src={product.image} alt="" />
                        <p className='name_product'>{product.name}</p>
                        <p className='price_discount'><strong>Ahora: </strong><em>$</em> {product.price}</p>
                        <input className='buy' type="submit" value="Comprar"></input>
                    </div>
                </Link>
            ))}
        </>
    );
}

export default ProductCard;
