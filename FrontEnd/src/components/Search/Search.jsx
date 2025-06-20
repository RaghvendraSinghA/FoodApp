import './Search.css'
import {useState,useContext} from 'react'
import {StoreContext} from '../../context/StoreContext.jsx'

const Search=()=>{
    const [search,setSearch]=useState('')
    const {food_list,itemsRef}=useContext(StoreContext)


    const handleScrollToItem = (id) => {
    const target = itemsRef.current[id];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });



      target.classList.add("highlight");
      setTimeout(() => target.classList.remove("highlight"), 1500);
    }
  };



    const filteredValue=food_list.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase()))
    
    const handleSearch=(e)=>{
       setSearch(e.target.value)
    }

    return(<div className="container">
        <div className='input-btn'>
        <input onChange={handleSearch} placeholder="search scroll Click....."></input>
        </div>
        <div className="items-container">
            {filteredValue.map(item=><div key={item._id} onClick={()=>handleScrollToItem(item._id)} className='item'>
                <p>{item.name}</p>
            </div>)}
        </div>
    
    
    </div>)
}

export default Search