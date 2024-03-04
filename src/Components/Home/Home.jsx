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
    const url_imgChatBot = 'https://i.pinimg.com/564x/f8/33/15/f83315a9855a4c0d41269f3980b2404b.jpg'


    return (
        <>
            <Header />

            {/* <div className='Profile_home'>
                <a href="/profile">
                    <img className='image_perfil' src="/images/profile.png" alt="Profile" />
                </a>
            </div> */}

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

                    <div className='chat-bot-home'>
                    {/* <ChatBotComponent/> */}

                    <div className="floating-chatbot" style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
                        {chatbotOpen && (
                            <iframe
                                src="https://webchat.botframework.com/embed/MercadoCampesino-bot?s=DwciEbhxT3M.GNMHWj2gP81wCkcMaCzw7EwPYXxJ6MacoCrJlw7GmOA"
                                style={{ minWidth: '400px', width: '100%', minHeight: '500px' }}
                                title="ChatBot"
                            ></iframe>
                        )}
                        <img
                        className='img_chatBot'
                            src="/images/chatbot.png"
                            alt="Icono de chatbot"
                            style={{ width: '50px', height: '50px', cursor: 'pointer' }}
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
