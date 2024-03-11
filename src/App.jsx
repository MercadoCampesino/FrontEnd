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
import { readToken } from './utils/readToken'
import { MarketProfileClient } from './Components/MarketProfileClient/MarketProfileClient'
import { CartProvider } from '../src/Components/Shopping/CartContext';

function App() {
  const dispatch = useDispatch()
  const isSeller = useSelector((state) => state.user?.user?.idTienda !== undefined)
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const user = readToken(token)
      dispatch(login(user))
    }
  }, [])

  return (
    <>
      <CartProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/discounts' element={<Discounts />} />
          <Route path='/products' element={<Products />} />
          {/* <Route path='/PerfilUsuario' element={PerfilUsuario} /> */}
          <Route path='/Login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/register' element={<SignUp />} />
          <Route path='/profile' element={isSeller ? <Profile /> : <ClientProfile />} />
          {/* <Route path="/market/:id" element={MarketProfile} /> */}
          {/* <Route path="/market/:id" element={<Market />} /> Ruta para mostrar detalles del mercado */}
          <Route path="/market" element={<MarketProfileClient />} />
        </Routes>
      </CartProvider>
    </>
  )
}

export default App
