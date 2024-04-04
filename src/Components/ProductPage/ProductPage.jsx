import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { SERVER_URL } from "../../Constants"
import { CartIcon } from "../Icon"
import "./ProductPage.css"
import { SingleProductCard } from "../SingleProductCard/SingleProductCard"
import Header from "../Header/Header"
import { useCart } from "../Shopping/CartContext"
import { useSelector } from "react-redux"
import Swal from "sweetalert2"

export const ProductPage = () => {
    const { addToCart } = useCart()
    const { productId } = useParams()
    const [product, setProduct] = useState({})
    const [products, setProducts] = useState([])
    const [tienda, setTienda] = useState({})
    const user = useSelector((state) => state.user?.user)
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


    const handleAddToCart = () => {
        console.log(user)
        if (!user?.["IDCliente"]) {
            Swal.fire({
                icon: "info",
                title: "Oops...",
                text: "Debes iniciar sesión para agregar productos al carrito.",
                timer: 5000,
                width: 300,
                heightAuto: false
            });
        } else {
            addToCart({
                idProducto: product.idProducto,
                nombre: product.nombre,
                precio: product.precio,
                imagen: product.imagen,
                cantidad: 1,
            });
            Swal.fire({
                position: "top-end",
                title: "Producto agregado al carrito.",
                showConfirmButton: false,
                width: 200,
                heightAuto: false,
                timerProgressBar: true,
                timer: 1500,
                customClass: {
                    title: 'small-title',
                    icon: 'small-icon',
                    timerProgressBar: 'small-timerProgressBar'
                }
            });
        }
    }

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

                        <button onClick={handleAddToCart} className="add-to-cart-button">
                            Agregar
                            <CartIcon />
                        </button>
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
                            <SingleProductCard userId={user.IDCliente} key={p.idProducto} {...p} />
                        ))}
                    </div>
                </section>

                <hr className="hr"/>
            </main>
            <Footer/>
        </>
    )
}