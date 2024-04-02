import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { SERVER_URL } from "../../Constants"
import { CartIcon } from "../Icon"
import "./ProductPage.css"
import { SingleProductCard } from "../SingleProductCard/SingleProductCard"
import Header from "../Header/Header"
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
            <main className="product-main">
                <header className="base-product-presentation">
                    <h2>Compra los mejores productos</h2>
                    <h3>Sabores que cuentan historias</h3>
                </header>
                <div className='hojas'>
                    <img className='hojasIzquierdabig' src="/images/hojasizqDesc.png" alt="" width={250} height={350} />
                    <img className='hojasDerechabig' src="/images/hojasderDescbig.png" alt="" width={130} height={315} />
                </div>
                <article className="product-container">
                    <picture className="product-image">
                        <img src={product.imagen} alt={product.nombre} />
                        
                    </picture>
                    <div className="product-info">
                        <h2>{product.nombre}</h2>
                        <hr className="hrrr"/>
                        <section className="tienda-info">
                            <picture>
                                <img src={tienda.imagen} alt={tienda.nombre} />
                                <hr className="hrproductpage" />
                            </picture>
                            <p>publicado por <em>{tienda.nombre}</em></p>
                        </section>
                        <p>Precio: ${product.precio}</p>
                        <button className="add-to-cart-button">
                            Agregar
                            <CartIcon />
                        </button>
                    </div>
                </article>
                <section className="related-products">
                    <h2>Productos que te podrian interesar</h2>
                    <div className="related-products-container">
                        {products.map((p) => (
                            <SingleProductCard key={p.idProducto} {...p} />
                        ))}
                    </div>
                </section>
            </main>
        </>
    )
}