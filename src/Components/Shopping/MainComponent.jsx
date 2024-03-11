// File where both components are rendered
import React from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { Shopping } from '../Shopping/Shopping';

const MainComponent = () => {
  function addToCart() {
    console.log("gello worlf")
  }

  return (
    <div>
      <ProductCard />
      <Shopping />
    </div>
  );
};

export default MainComponent;
