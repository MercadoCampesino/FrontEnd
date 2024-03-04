import React, { useState } from 'react';
import DiscountedProducts from '../ProductCard/DiscountedProducts';
import { Footer } from '../Footer/Footer';
import Header from '../Header/Header';
import './Discounts.css';

export default function Discounts() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  return (
    <>
      <Header />

      {/* cristian remplazar todo este bloque */}
      <div className='title_products'>{/* cristian */}
        <h2>Disfruta de la frescura de la tierra a precios irresistibles</h2>{/* cristian */}
        <p>siente el sabor de lo autentico con nuestros descuentos en el mercado campesino</p>{/* cristian */}
      </div>{/* cristian */}

      <div className='search_products'>
        <input
          className='busquedaProductos'
          type='search'
          name='busquedaProductos'
          placeholder='Buscar productos en descuento...'
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className='discounts'>
        <div className='cont_discounts'>
          <DiscountedProducts searchTerm={searchTerm} />
        </div>
      </div>

      <hr className='hr' /> {/* cristian */}

      <Footer />
    </>
  );
}






// import React, { useState } from 'react';
// import DiscountedProducts from '../ProductCard/DiscountedProducts';
// import { Footer } from '../Footer/Footer';
// import Header from '../Header/Header';
// import './Discounts.css';

// export default function Discounts() {
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value.toLowerCase());
//   };

//   return (
//     <>
//       <Header />
//       <div className='title_discounts'>
//         <h2>Descuentos</h2>
//       </div>
//       <div className='search_products'>
//         <input
//           className='busquedaProductos'
//           type='search'
//           name='busquedaProductos'
//           placeholder='Buscar productos en descuento...'
//           value={searchTerm}
//           onChange={handleSearch}
//         />
//       </div>
//       <div className='discounts'>
//         <div className='cont_discounts'>
//           <DiscountedProducts searchTerm={searchTerm} />
//         </div>
//       </div>  
//       <Footer />
//     </>
//   );
// }









// import React, { useState } from 'react';
// import DiscountedProducts from '../ProductCard/DiscountedProducts';
// import { Footer } from '../Footer/Footer';
// import Header from '../Header/Header';
// import './Discounts.css';

// export default function Discounts() {
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value.toLowerCase());
//   };

//   return (
//     <>
//       <Header />
//       <div className='title_discounts'>
//         <h2>Descuentos</h2>
//       </div>
//       <div className='search_products'>
//         <input
//           className='busquedaProductos'
//           type='search'
//           name='busquedaProductos'
//           placeholder='Buscar productos...'
//           value={searchTerm}
//           onChange={handleSearch}
//         />
//       </div>
//       <div className='discounts'>
//         <div className='cont_discounts'>
//           <DiscountedProducts showAll={true} searchTerm={searchTerm} />
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }










// import React, { useState } from 'react';
// import DiscopuntedProducts from '../ProductCard/DiscountedProducts';
// import { Footer } from '../Footer/Footer';
// import Header from '../Header/Header';
// import './Discounts.css';

// export default function Discounts() {
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value.toLowerCase());
//   };

//   return (
//     <>
//       <Header />
//       <div className='title_discounts'>
//         <h2>Descuentos</h2>
//       </div>
//       <div className='search_products'>
//         <input
//           className='busquedaProductos'
//           type='search'
//           name='busquedaProductos'
//           placeholder='Buscar productos...'
//           value={searchTerm}
//           onChange={handleSearch}
//         />
//       </div>
//       <div className='discounts'>
//         <div className='cont_discounts'>
//           <DiscopuntedProducts showAll={true} searchTerm={searchTerm} />
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }







// import React, { useState } from 'react';
// import DiscopuntedProducts from '../ProductCard/DiscountedProducts';
// import { Footer } from '../Footer/Footer';
// import Header from '../Header/Header';
// import './Discounts.css';

// export default function Discounts() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [showProductCard, setShowProductCard] = useState(true);

//   const handleSearch = (event) => {
//     const searchTerm = event.target.value;
//     setSearchTerm(searchTerm);

//     if (searchTerm.length === 0) {
//       setShowProductCard(true); // Mostrar ProductCard cuando el campo de búsqueda está vacío
//       setFilteredProducts([]); // Reiniciar la lista de productos filtrados
//     } else {
//       setShowProductCard(false); // Ocultar ProductCard mientras se busca
//       // Suponiendo que DiscopuntedProducts recibe un prop llamado products con la lista de productos
//       const filtered = products.filter((product) =>
//         product.name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredProducts(filtered);
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className='title_discounts'>
//         <h2>Descuentos</h2>
//       </div>
//       <div className='search_products'>
//         <input
//           className='busquedaProductos'
//           type='search'
//           name='busquedaProductos'
//           placeholder='Buscar productos...'
//           value={searchTerm}
//           onChange={handleSearch}
//         />
//       </div>
//       <div className='discounts'>
//         <div className='cont_discounts'>
//           {filteredProducts.length > 0 ? (
//             filteredProducts.map((product) => (
//               <div className='card_product' key={product.id}>
//                 <img className='image' src={product.image} alt='' />
//                 <p className='name_product'>{product.name}</p>
//                 <p className='price_product'>Precio: ${product.price}</p>
//                 <input className='buy' type='submit' value='Comprar' />
//               </div>
//             ))
//           ) : (
//             <DiscopuntedProducts showAll={true} />
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }







// import React from 'react'
// import DiscopuntedProducts from '../ProductCard/DiscountedProducts'
// import { Footer } from '../Footer/Footer'
// import Header from '../Header/Header'
// import './Discounts.css'

// export default function Discounts() {

//   return (
//     <>
//       <Header />
//       <div className='title_discounts'>
//         <h2>Descuentos</h2>
//       </div>
//       <div className='discounts'>
//         <div className='cont_discounts'>
//           <DiscopuntedProducts showAll={true} />
//         </div>
//       </div>
//       <Footer />
//     </>
//   )
// }
