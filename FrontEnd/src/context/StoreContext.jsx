import {createContext,useState,useEffect,useRef} from 'react'
import {food_list} from "../assets/assets.js"

export const StoreContext=createContext(null)

const StoreContextProvider=(props)=>{
    const[cartItems,setCartItems]=useState({})
    const url='https://food-app-backend-blush.vercel.app'
    const [token,setToken]=useState("")
    const itemsRef=useRef({})

    const addToCart=(itemId)=>{
        if(!cartItems||!cartItems[itemId]){
            setCartItems(prev=>({...prev,[itemId]:1}))
        }else{
            setCartItems(prev=>({...prev,[itemId]:prev[itemId]+1}))
        }
    }

    const removeFromCart=(itemId)=>{
        setCartItems(prev=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount=()=>{
        let total=0
        for(const item in cartItems){
            if(cartItems[item]>0){
                let iteminfo=food_list.find((product)=>product._id===item)
                total=total+iteminfo.price*cartItems[item]
            }
        }
        return total
    }

    useEffect(()=>{
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
        }
    },[])

    useEffect(()=>{
        getCartItems()
    },[token])

    useEffect(()=>{
        if(token){
        setLocalCart()
        }
    },[cartItems])

    const setLocalCart=()=>{
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
    }

    const getCartItems=()=>{
        const response=JSON.parse(localStorage.getItem("cartItems"))
        setCartItems(response)
    }

    const contextValue={
        food_list,cartItems,setCartItems,addToCart,removeFromCart,getTotalCartAmount,url,token,setToken,itemsRef
    }

    return(
    <StoreContext.Provider value={contextValue}>
    {props.children}
    </StoreContext.Provider>
    )
}
export default StoreContextProvider;