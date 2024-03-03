import React from 'react'
import Header from '../Header/Header'
import ProductCard from '../ProductCard/ProductCard'
import DiscountedProducts from '../ProductCard/DiscountedProducts'
import { Footer } from '../Footer/Footer'
import './Home.css'
import Market from '../Market/Market'


export default function Home() {


    return (
        <>
            <Header />

            <div className='Profile_home'>
                <a href="/profile">
                    <img className='image_perfil' src="/images/profile.png" alt="Profile" />
                </a>
            </div>

            <div className='home'>
                <div className='slide'>

                    <ul>
                        <li><img src="/images/folder_1.jpeg" alt="" /></li>
                        <li><img src="/images/folder_2.jpeg" alt="" /></li>
                        <li><img src="/images/folder_3.jpeg" alt="" /></li>
                        <li><img src="/images/folder_4.jpeg" alt="" /></li>
                    </ul>

                </div>

                <div className='center_productsDiscount producColor'>
                    <h2>Descubre el encanto rural</h2>
                    <p className='featured_phrase_home'>Encuentra los mercados mas destacados, con productos de calidad</p>

                    <h3 className='title_discount_home'>Descuentos frescos en el Mercado Campesino</h3>

                    <div className='discount_color'>
                        <div className='products_discount'>
                            <DiscountedProducts showAll={false} />
                        </div>
                    </div>

                    <button className='see_more_discount'>
                        <a className='see_more_discount_a' href="/discounts">Ver más...</a>
                    </button>
                </div>

                <div className='center_products_'>
                    <div className='featured_product'>
                        <h2 className='featured_product_title'>Productos destacados</h2>
                        <p>El alma de la tierra en cada producto</p>
                    </div>

                    <div className='products_'>
                        <ProductCard />
                    </div>

                    <button className='see_more_products' >
                        <a className='see_more_a' href="/products">Ver más...</a>
                    </button>
                </div>

                <div className='Cont_markets'>
                    <div className='title_recommended_markets'>
                        <h2>Mercados recomendados</h2>
                        <p>Encuentra los mercados mas destacados, con productos de calidad</p>
                    </div>

                    <div className='markets'>
                        <Market />
                    </div>

                    <hr className='hr' />
                </div>
            </div>
            <Footer />
        </>
    )
}
