import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { SERVER_URL } from "../../Constants"
import { CartIcon } from "../Icon"
import "./ProductPage.css"
import { SingleProductCard } from "../SingleProductCard/SingleProductCard"
import Header from "../Header/Header"
import { Footer } from "../Footer/Footer"

export const ProductPage = () => {
    const { productId } = useParams()
    const [product, setProduct] = useState({})
    const [products, setProducts] = useState([])
    const [tienda, setTienda] = useState({})

    useEffect(() => {
        async function getProduct() {
            try {
                const response = await fetch(SERVER_URL + "Producto/ObtenerProducto/" + productId)
                console.log(response)
                const data = await response.json()
                setProduct(data.response)
            } catch (error) {
                console.error("Error fetching product:", error)
            }
        }

        getProduct()
    }, [productId])

    useEffect(() => {
        if (!product.fK_IDTienda) return
        async function getTienda() {
            try {
                const response = await fetch(SERVER_URL + "Tienda/ObtenerTienda/" + product.fK_IDTienda)
                console.log(response)
                const data = await response.json()
                console.log(data)
                setTienda(data.response)
            } catch (error) {
                console.error("Error fetching tienda:", error)
            }
        }

        getTienda()
    }, [product])

    useEffect(() => {
        async function getProducts() {
            try {
                const response = await fetch(SERVER_URL + "Producto/ListaProducto")
                console.log(response)
                const data = await response.json()
                console.log(data)
                setProducts(data.response.filter((p) => p.idProducto !== product.idProducto))
            } catch (error) {
                console.error("Error fetching products:", error)
            }
        }

        getProducts()
    }, [])

    return (
        <>
            <Header />
            <div className='hojas'>
                <img className='hojasIzquierdabig' src="/images/hojasizqDesc.png" alt="" width={250} height={350} />
                <img className='hojasDerechabig' src="/images/hojasderDescbig.png" alt="" width={130} height={315} />
            </div>

            <main className="product-main">
                <div className="product-presentation title_recommended_markets">
                    <h2>Compra los mejores productos</h2>
                    <p>Sabores que cuentan historias</p>
                </div>

                <article className="product-container">
                    <div className="cont_img_descrip">
                        <picture className="product-img">
                            <img src={product.imagen} alt={product.nombre} />
                        </picture>
                    </div>

                    <div className="product-info">
                        <div className="info_description">
                            <h2>{product.nombre}</h2>

                            <section className="tienda-info">
                                <picture>
                                    <img src={tienda.imagen} alt={tienda.nombre} />
                                </picture>

                                <p>Publicado por <em>{tienda.nombre}</em></p>
                            </section>

                            <p>Precio: ${product.precio}</p>

                            <button className="add-to-cart-button">Agregar <CartIcon /></button>
                        </div>
                    </div>
                </article>

                <section className="related-products">
                    <div className="title_aliados">
                        <h2>Productos que te podrian interesar</h2>
                        <p>Mira un poco más alla, descubre nuevas cosas</p>
                    </div>

                    <div className='hojas'>
                        <img className='hojasIzquierdabig' src="/images/hojasizqDesc.png" alt="" width={250} height={350} />
                        <img className='hojasDerechabig' src="/images/hojasderDescbig.png" alt="" width={130} height={315} />
                    </div>

                    <div className="related-products-container">
                        {products.map((p) => (
                            <SingleProductCard key={p.idProducto} {...p} />
                        ))}
                    </div>
                </section>

                <hr className="hr"/>
            </main>
            <Footer/>
        </>
    )
}