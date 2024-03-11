// File where both components are rendered
import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { Shopping } from '../Shopping/Shopping';

const MainComponent = () => {
  const agregarAlCarrito = (producto) => {
    // Aquí puedes realizar cualquier lógica adicional antes de agregar al carrito, si es necesario
    console.log('Producto agregado al carrito:', producto);
  };

  return (
    <div>
      <ProductCard agregarAlCarrito={agregarAlCarrito} />
      <Shopping />
    </div>
  );
};

export default MainComponent;
