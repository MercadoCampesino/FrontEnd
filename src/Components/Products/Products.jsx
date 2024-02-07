import React from 'react'
import ProductList from '../ProductList/ProductList'
import Product from '../Product/Product'
import './Products.css'

export default function Products() {
  return (
    <div className='content_products'>
      <div >
        <div className='hola'>
          <ProductList />
        </div>
      </div>

      <div className='chao'>
        <div className='product'>
        <Product />
        </div>
      </div>
    </div>
  )
}
