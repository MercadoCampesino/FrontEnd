import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home/Home'
import NotFound from './Components/NotFound/NotFound'
import Discounts from './Components/Discounts/Discounts'
import Products from './Components/Products/Products'
import Login from './Components/Login/Login'
import { SignUp } from './Components/Register/SignUp'
import Profile from './Components/Profile/MarketProfile'
// import MarketProfile from './Components/Market/Market'
import Market from './Components/Market/Market'
import ClientProfile from './Components/ClientProfile/ClientProfile'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from './store/slices/user'
import { setLikes } from "./store/slices/likes"
import { readToken } from './utils/readToken'
import { MarketProfileClient } from './Components/MarketProfileClient/MarketProfileClient'
import { CartProvider } from '../src/Components/Shopping/CartContext';
import { Buys } from './Components/Shopping/Buys/Buys'

function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user?.user)
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const user = readToken(token)
      dispatch(login(user))
    }
  }, [])

  useEffect(() => {
    
    async function getLikes() {
      if (user?.IDCliente == undefined) return
      console.log(user.IDCliente)
      const response = await fetch(`https://mercadocampesino.azurewebsites.net/Favoritos/ListarFavoritosPorPersona?FK_IDCliente1=${user.IDCliente}`)
      const data = await response.json()
      console.log(data)
      dispatch(setLikes(data.response))
    }

    getLikes()

  }, [user])

  return (
    <>
      <CartProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/discounts' element={<Discounts />} />
          <Route path='/products' element={<Products />} />
          {/* <Route path='/PerfilUsuario' element={PerfilUsuario} /> */}
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/register' element={<SignUp />} />
          <Route path='/profile' element={user?.idTienda != undefined ? <Profile /> : <ClientProfile />} />
          {/* <Route path="/market/:id" element={MarketProfile} /> */}
          {/* <Route path="/market/:id" element={<Market />} /> Ruta para mostrar detalles del mercado */}
          <Route path="/market" element={<MarketProfileClient />} />
          <Route path='/buy' element={<Buys/>}></Route>
        </Routes>
      </CartProvider>
    </>
  )
}

export default App
