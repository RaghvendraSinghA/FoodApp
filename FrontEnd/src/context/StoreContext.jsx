import {createContext,useState,useEffect} from 'react'
import {food_list} from "../assets/assets.js"

export const StoreContext=createContext(null)

const StoreContextProvider=(props)=>{
    const[cartItems,setCartItems]=useState({})
    const url='https://food-app-backend-blush.vercel.app'
    const [token,setToken]=useState("")

    const addToCart=(itemId)=>{
        //cartItmes is like hashmap and we using itemId as key
        if(!cartItems[itemId]){
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
            if(cartItems[item]>0){          //this checks if item exist in cartItems bcoz it is like hashmap.we increase decrease the quantity.So item can exist but with 0 quantity.
                let iteminfo=food_list.find((product)=>product._id===item)
                total=total+iteminfo.price*cartItems[item]
            }
        }
        return total
    }

    useEffect(()=>{
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
            getCartItems() //It loads data from localStorage and sets in cartItems
        }
        
    },[]) //array was empty and getCart was outside.

    useEffect(()=>{
        setCartItemsInLocalStorage() //it sets cartItems in localStorage.
    },[cartItems])

    const setCartItemsInLocalStorage=()=>{
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
    }

    const getCartItems=()=>{
        const response=JSON.parse(localStorage.getItem("cartItems"))
        setCartItems(response)
    }




    const contextValue={
        food_list,cartItems,setCartItems,addToCart,removeFromCart,getTotalCartAmount,url,token,setToken
    }

    return(
    <StoreContext.Provider value={contextValue}>
    {props.children}
    </StoreContext.Provider>
    )
}
export default StoreContextProvider;