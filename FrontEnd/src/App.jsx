import Navbar from '../src/components/Navbar/Navbar.jsx'
import {Route,Routes} from 'react-router-dom'
import Home from '../src/pages/Home/Home.jsx'
import Cart from '../src/pages/Cart/Cart.jsx'
import PlaceOrder from '../src/pages/PlaceOrder/PlaceOrder.jsx'
import Footer from './components/Footer/Footer.jsx'
import LoginPopup from './components/LoginPopup/LoginPopup.jsx'
import {useState} from 'react'



function App() {
    const [showLogin,setShowLogin]=useState(false)
  
  
    return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
