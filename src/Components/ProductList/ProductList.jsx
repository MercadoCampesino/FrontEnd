import React, { useState } from 'react';

import productsData from '../../assets/Products/Products';

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = () => {
    const filtered = productsData.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className='featured_products'>
      <div className='serch_products'>
        <h2>Productos destacados</h2>
        <p>Encuentra los mejores productos con excelente calidad</p>

        <div className='serch_'>
          <input className='busquedaProductos' type='search' name='busquedaProductos' placeholder='Buscar...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input className='buscar' type='submit' value='Buscar' onClick={handleSearch}
          />
        </div>
      </div>

      {/* <br /> */}

      <div className='a'>
        <div className='p'>
          {searchTerm &&
            filteredProducts.map((product) => (
              <div className='card_product' key={product.id}>
                <img className='image' src={product.image} alt='' />
                <p className='name_product'>{product.name}</p>
                <p className='price_product'>Precio: ${product.price}</p>
                <input className='buy' type='submit' value='Comprar' />
              </div>
            ))}
        </div>
      </div>


    </div>
  );
};

export default ProductList;

