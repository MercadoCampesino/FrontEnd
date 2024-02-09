import React, { useState } from 'react';
import Header from '../Header/Header';
import productsData from '../../assets/Products/products';
import ProductCard from '../ProductCard/ProductCard';
import './Products.css';

const Product = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showProductCard, setShowProductCard] = useState(true);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    if (searchTerm.length === 0) {
      setShowProductCard(true); // Mostrar ProductCard cuando el campo de búsqueda está vacío
      setFilteredProducts([]); // Reiniciar la lista de productos filtrados
    } else {
      setShowProductCard(false); // Ocultar ProductCard mientras se busca
      const filtered = productsData.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <>
      <Header />
      <div className='img_folder'>
        <img src="/images/folder.png" alt="" />
      </div>

      <div className='content_products'>
        <div className='featured_products'>
          <div className='search_products'>
            <div className='title_products'>
              <h2>La esencia de la naturaleza en cada producto</h2>
              <p>Conoce las joyas del mercado agrícola</p>
            </div>

            <div className='search_'>
              <input
                className='busquedaProductos'
                type='search'
                name='busquedaProductos'
                placeholder='Buscar productos...'
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          <div className='product_list'>
            {filteredProducts.map((product) => (
              <div className='card_product' key={product.id}>
                <img className='image' src={product.image} alt='' />
                <p className='name_product'>{product.name}</p>
                <p className='price_product'>Precio: ${product.price}</p>
                <input className='buy' type='submit' value='Comprar' />
              </div>
            ))}
          </div>
        </div>

        {/* Mostrar ProductCard solo si showProductCard es verdadero */}

        {showProductCard && (
          <div className='product'>
            <ProductCard />
          </div>
        )}
      </div>

    </>
  );
};

export default Product;

