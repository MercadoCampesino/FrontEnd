import React, { useState } from 'react';
import Header from '../Header/Header';
import ProductCard from '../ProductCard/ProductCard';
import './Products.css';
import { Footer } from '../Footer/Footer';
// import ProductList from '../ProductCard/ProductCard'

const Products = () => {
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
      const filtered = ProductList.filter((Product) =>
        Product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <>
      <Header />
      <div className='slide'>

        <ul>
          <li><img src="/images/folder_1.jpeg" alt="" /></li>
          <li><img src="/images/folder_2.jpeg" alt="" /></li>
          <li><img src="/images/folder_3.jpeg" alt="" /></li>
          <li><img src="/images/folder_4.jpeg" alt="" /></li>
        </ul>

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
              <div className='card_product' key={product.idProducto}>
                <img className='image' src={product.imagen} alt='' />
                <p className='name_product'>{product.nombre}</p>
                <p className='price_product'>Precio: ${product.precio}</p>
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

      <Footer />
    </>
  );
};

export default Products;

