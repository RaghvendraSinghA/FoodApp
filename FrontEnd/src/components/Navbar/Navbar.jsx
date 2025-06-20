import React,{useContext,useState} from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets.js'
import {Link,useNavigate} from 'react-router-dom'
import {StoreContext} from '../../context/StoreContext.jsx'
import Search from '../Search/Search.jsx'

const Navbar = ({setShowLogin})=>{
        const [search,setSearch]=useState(false)
        const [menu,setMenu]=useState('home')
        const {getTotalCartAmount,token,setToken}=useContext(StoreContext)
        const navigate=useNavigate()
        const logout=()=>{
            localStorage.removeItem("token")
            localStorage.removeItem("cartItems")
            setToken("")
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
                <div className="search-icon">
                <div className='search-icon-card'>
                    {search&&<Search />}
                </div>    
                <img onClick={()=>setSearch(prev=>!prev)} src={assets.search_icon} alt="icon" />
                </div>


                <div className="navbar-search-icon">
                   <Link to={"/cart"}><img src={assets.basket_icon} alt="" /></Link> 
                    <div className={getTotalCartAmount()===0?"":"dot"}></div>
                </div>


                {!token?<button onClick={()=>setShowLogin(true)} className="btn">sign-in</button>:<div className="navbar-profile">
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