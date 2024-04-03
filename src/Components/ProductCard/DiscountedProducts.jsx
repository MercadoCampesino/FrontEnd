// import React from 'react';
// import productsDiscount from '../../assets/Products/productsDiscount';
// import './DiscountedProducts.css'
// import { AddToCartIcon } from '../Icon';
// import { useCart } from '../Shopping/CartContext';


// function DiscountedProducts({ showAll }) {

//   const productsToShow = showAll ? productsDiscount : productsDiscount.slice(0, 4);


//   const { addToCart } = useCart();
//   const handleClick = (product) => {
//     addToCart(product);
//   }
//   return (
//     <>
//       {productsToShow.map((product) => (
//         <div className='card_products' key={product.id}>
//           <img className='images' src={product.image} alt="" />
//           <p className='name_products'>{product.name}</p>

//           <div className='name_price_product'>
//             <p className='price_discount'><strong>Ahora: </strong> <em>$</em> {product.priceDiscount} 1Kg</p>
//             <p className='price_discount'><strong>Antes: </strong><span ><em>$</em> {product.price}  1Kg</span> </p>
//           </div>

//           <div className='agregarboton'>
//             <button className='button-addToCartIcon' onClick={() => {
//               const productInSpanish = {
//                 ...product,
//                 nombre: product.name,
//                 precio: product.priceDiscount,
//                 descuento: product.price,
//                 imagen: product.image,
//                 idProducto: product.id,
//                 existencia: product.stock
              
//               }
              
//               handleClick(productInSpanish)
//             }}>
//               <AddToCartIcon />
//               <p>Agregar</p>
//             </button>
//           </div>

//         </div>
//       ))}
//     </>
//   );
// }

// export default DiscountedProducts;

import React from 'react';
import productsDiscount from '../../assets/Products/productsDiscount';
import './DiscountedProducts.css'
import { AddToCartIcon } from '../Icon';
import { useCart } from '../Shopping/CartContext';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2'

function DiscountedProducts({ showAll }) {

  const productsToShow = showAll ? productsDiscount : productsDiscount.slice(0, 4);
  const { addToCart } = useCart();
  const user = useSelector((state) => state?.user?.user);

  const handleClick = (product) => {
    if (!user) {
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Debes iniciar sesión para agregar productos al carrito.",
        showConfirmButton: false,
        timer: 4000
      });
    } else {
      addToCart(product);
      Swal.fire({
        position: "top-end",
        title: "Producto agregado al carrito.",
        showConfirmButton: false,
        width: 200,
        heightAuto: false,
        timerProgressBar: true,
        timer: 2000,
        customClass: {
          title: 'small-title',
          icon: 'small-icon',
          timerProgressBar: 'small-timerProgressBar'
      }
      });
    }
  }

  return (
    <>
      {productsToShow.map((product) => (
        <div className='card_products' key={product.id}>
          <img className='images' src={product.image} alt="" />
          <p className='name_products'>{product.name}</p>

          <div className='name_price_product'>
            <p className='price_discount'><strong>Ahora:</strong> <em>$</em>{product.priceDiscount} COP 1Kg</p>
            <p className='price_discount'><strong>Antes:</strong><span ><em>$</em>{product.price} COP 1Kg</span> </p>
          </div>

          <div className='agregarboton'>
            <button className='button-addToCartIcon' onClick={() => {
              const productInSpanish = {
                ...product,
                nombre: product.name,
                precio: product.priceDiscount,
                descuento: product.price,
                imagen: product.image,
                idProducto: product.id,
                existencia: product.stock
              }
              handleClick(productInSpanish)
            }}>
              <AddToCartIcon />
              <p>Agregar</p>
            </button>
          </div>

        </div>
      ))}
    </>
  );
}

export default DiscountedProducts;
