import React,{useContext,useState} from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets.js'
import {Link,useNavigate} from 'react-router-dom'
import {StoreContext} from '../../context/StoreContext.jsx'

//token is used here to check either to show 'sign-in' button or 'profile icon' which have logout and profile button .

const Navbar = ({setShowLogin})=>{
        const [menu,setMenu]=useState('home')       //used to set bottom border of home/contact-us
        const {getTotalCartAmount,token,setToken,setCartItems}=useContext(StoreContext)
        const navigate=useNavigate()
        const logout=()=>{
            localStorage.removeItem("token")
            localStorage.removeItem("cartItems")
            setToken("")
            setCartItems({})

            //getTotalCartAmount is used to show red dot on bag or not.
            navigate('/')

        }
    return(
        <div className="navbar">
            <Link to={"/"}><img src={assets.logo} alt="logo" className='logo'/></Link>

            <ul className="navbar-menu">
                <Link to={"/"} className={menu==="home"?"active":""} onClick={()=>setMenu("home")}>home</Link>
                <a href="#explore-menu" className={menu==="menu"?"active":""} onClick={()=>setMenu("menu")}>menu</a>
                <a href="#app-download" className={menu==="mobile"?"active":""} onClick={()=>setMenu("mobile")}>mobile-version</a>
                <a href="#footer" className={menu==="contact"?"active":""} onClick={()=>setMenu("contact")}>contact-us</a>
            </ul>


            <div className="navbar-right">
                <img src={assets.search_icon} alt="icon" />
                <div className="navbar-search-icon">
                   <Link to={"/cart"}><img src={assets.basket_icon} alt="" /></Link> 
                    <div className={getTotalCartAmount()===0?"":"dot"}></div>
                </div>
                {!token?<button onClick={()=>setShowLogin(true)} className="btn">sign-in</button>
                :<div className="navbar-profile">
                         <img src={assets.profile_icon} alt="" />
                         <ul className="nav-profile-dropdown">
                           <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                           <hr />
                           <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                        </ul>
                        </div>}
            </div>
        </div>
    )
}

export default Navbar