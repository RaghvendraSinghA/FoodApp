import React from 'react'
import {useContext,useState} from 'react'
import {StoreContext} from '../../context/StoreContext.jsx'
import './FoodDisplay.css'
import FoodItem from '../FoodItem/FoodItem.jsx'


const FoodDisplay =({category})=>{
    const {food_list,itemsRef}=useContext(StoreContext)


    return(<div className="food-display" id='food-display'>
        <h2 id="items" >Available Dishes near you</h2>
        <div className="food-display-list">
            {food_list.map((item,index)=>{
                if(category==='All' || category===item.category){
                return(
                    <FoodItem ref={el => (itemsRef.current[item._id] = el)}
 key={index} id={item._id} name={item.name} description={item.description} price={item.price}  image={item.image}/>
                )
            }
            })}
        </div>

    </div>)
}
export default FoodDisplay