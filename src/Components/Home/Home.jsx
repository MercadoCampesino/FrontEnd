import Header from '../Header/Header'
import ProductCard from '../ProductCard/ProductCard'
import DiscountedProducts from '../ProductCard/DiscountedProducts'
import { Footer } from '../Footer/Footer'
import './Home.css'
import Market from '../Market/Market'
import React, { useState } from 'react';

export default function Home() {

    const [chatbotOpen, setChatbotOpen] = useState(false);

    const toggleChatbot = () => {
        setChatbotOpen(!chatbotOpen);
    };
    // const url_imgChatBot = 'https://i.pinimg.com/564x/f8/33/15/f83315a9855a4c0d41269f3980b2404b.jpg'



    return (
        <>
            <Header />

            <div className='home'>
                <section className='cont1'>
                    <div className='slide'>
                        <ul>
                            <li><img src="/images/slide1.jpg" alt="" /></li>
                            <li><img src="/images/slide3.jpg" alt="" /></li>
                            <li><img src="/images/slide2.jpg" alt="" /></li>
                            <li><img src="/images/slide4.jpg" alt="" /></li>
                        </ul>
                    </div>
                    <div className='tittles'>
                        <h2>Descubre </h2>
                        <h2>El encanto rural</h2>
                        <h3>Mercado Campesino</h3>
                    </div>
                </section>
                <div className='hojas'>
                    <img className='hojasIzquierda' src="/images/hojasizqDesc.png" alt="" width={200} height={255} />
                    <img className='hojasDerecha' src="/images/hojasderDesc.png" alt="" width={140} height={240} />
                </div>
                <div className='center_productsDiscount producColor'>
                    <h2>Descuentos frescos en el Mercado Campesino</h2>
                    <p className='featured_phrase_home'>Encuentra los mercados mas destacados, con productos de calidad</p>


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

                    <div className='hojas'>
                        <img className='hojasIzquierdabig' src="/images/hojasizqDesc.png" alt="" width={250} height={350} />
                        <img className='hojasDerechabig' src="/images/hojasderDescbig.png" alt="" width={130} height={315} />
                    </div>

                    <div className='products_'>
                        <ProductCard />
                    </div>

                    <div className='chat-bot-home'>
                        {/* <ChatBotComponent/> */}

                        <div className="floating-chatbot" style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
                            {chatbotOpen && (
                                <iframe
                                    src="https://webchat.botframework.com/embed/MercadoCampesino-bot?s=DwciEbhxT3M.GNMHWj2gP81wCkcMaCzw7EwPYXxJ6MacoCrJlw7GmOA"
                                    style={{ minWidth: '400px', width: '30%', minHeight: '500px' }}
                                    title="ChatBot"
                                ></iframe>
                            )}
                            <img
                                className='img_chatBot'
                                src="/images/bot.png"
                                alt="Icono de chatbot"
                                style={{ width: '65px', height: '65px', cursor: 'pointer' }}
                                onClick={toggleChatbot}
                            />
                        </div>
                        {/* <a href="/chatBot">
                        <img src={url_imgChatBot} alt="" />
                    </a> */}
                        {/* <img src={url_imgChatBot} alt="" /> */}
                    </div>

                    <button className='see_more_products' >
                        <a className='see_more_a' href="/products">Ver más...</a>
                    </button>
                </div>

                <img className='hojasIzquierdabig' src="/images/hojasizqDesc.png" alt="" width={250} height={350} />
                        <img className='hojasDerechabig' src="/images/hojasderDescbig.png" alt="" width={130} height={315} />


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
