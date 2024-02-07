import './App.css'
import Header from './Components/Header/Header'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home/Home'
import NotFound from './Components/NotFound/NotFound'
import Discounts from './Components/Discounts/Discounts'
import product from './Components/Product/Product'
// import Registro from './Components/Registro/Registro'
// import PerfilUsuario from './Components/PerfilUsuario/PerfilUsuario'


function App() {

  return (
    <>
    {/* <Header/> */}

    <Routes>
      <Route path='/' element= {<Home/>}></Route>
      <Route path='/descuentos' element= {<Discounts/>}></Route>
      {/* <Route path='/productos' element= {<Product/>}></Route> */}
      {/* <Route path='/PerfilUsuario' element= {<PerfilUsuario/>}></Route> */}
      <Route path='*' element= {<NotFound/>}></Route>
    </Routes>
    </>
  )
}

export default App
