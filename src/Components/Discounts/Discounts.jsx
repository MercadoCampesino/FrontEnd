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


      <div className='title_products'>
        <div>
          <h2>Disfruta de la frescura de la tierra a precios irresistibles</h2>
          <p>siente el sabor de lo autentico con nuestros descuentos en el mercado campesino</p>
        </div>
      </div>


      <div className='hojas'>
        <img className='hojasIzquierdadescu' src="/images/hojasizqDesc.png" alt="" width={200} height={240} />
        <img className='hojasDerechadescu' src="/images/hojasderDesc.png" alt="" width={120} height={210} />
      </div>


      <div className='slides1'>
        <div className='slides'>
          <ul>
            <li><img src="https://cazaofertas.com.mx/wp-content/uploads/2021/01/codigo-justo-20-descuento-frutas-verduras.jpg" alt="" /></li>
            <li><img src="https://www.comfandi.com.co/sites/default/files/styles/hero_tall_1x/public/2023-08/MicrosoftTeams-image%20%28112%29.png?itok=PsnEuDV6" alt="" /></li>
            <li><img src="https://pbs.twimg.com/media/CLqRTKqWoAEbqrO.png" alt="" /></li>
            <li><img src="https://res.cloudinary.com/dvzi49e79/image/upload/f_auto,q_auto/v1/MercadoCampesino/b7thxo14ednlxtmg7hmh" alt="" /></li>
          </ul>
        </div>
      </div>

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
      <div className='hojas'>
        <img className='hojasIzquierdabig' src="/images/hojasizqDesc.png" alt="" width={250} height={350} />
        <img className='hojasDerechabig' src="/images/hojasderDescbig.png" alt="" width={130} height={315} />
      </div>
      </div>



      <div className='discountsa'>

        <div className='cont_discountsa'>
          <DiscountedProducts searchTerm={searchTerm} />
          {/* <DiscountedProducts searchTerm={searchTerm} />
          <DiscountedProducts searchTerm={searchTerm} /> */}
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
