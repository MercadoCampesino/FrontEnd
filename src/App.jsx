
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home/Home'
import NotFound from './Components/NotFound/NotFound'
import Discounts from './Components/Discounts/Discounts'
import Products from './Components/Products/Products'
import Login from './Components/Login/Login'
import { SignUp } from './Components/Register/SignUp'
import { Provider } from 'react-redux'
import { store } from './store/index'

function App() {
  return (
    <Provider store={store}>
      <>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/discounts' element={<Discounts />}></Route>
          <Route path='/products' element={<Products />}></Route>
          {/* <Route path='/PerfilUsuario' element= {<PerfilUsuario/>}></Route> */}
          <Route path='/Login' element={<Login />}></Route>
          <Route path='*' element={<NotFound />}></Route>
          <Route path='/register' element={<SignUp />}></Route>
        </Routes>
      </>
    </Provider>
  )
}

export default App
