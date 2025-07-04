import './FoodItem.css'
import {assets} from '../../assets/assets.js'
import {useContext} from 'react'
import {StoreContext} from '../../context/StoreContext.jsx'
import React from 'react'


const FoodItem =React.forwardRef((props,ref)=>{
    const {id,name,price,description,image}=props
    const{cartItems,addToCart,removeFromCart}=useContext(StoreContext)
    return(
        <div className="food-item" ref={ref}>
            <div className="food-item-img-container">
                <img className='food-item-image' src={image}/>
                 {/*  this adds add,remove button and also shows no of food added to cart if item id is found in cartItem*/}
                {!cartItems ||!cartItems[id]?<img className="add" onClick={()=>addToCart(id)} src={assets.add_icon_white} alt=""/>:<div className="food-item-counter">
                    <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                    <p>{cartItems[id]}</p>
                    <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt=""/>
                    </div>}

            </div>
            <div className='food-item-info'>
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="" />
                </div>
                <p className="food-item-desc">{description}</p>
                <p className='food-item-price'>${price}</p>
            </div>

        </div>
    );
});
export default FoodItem;