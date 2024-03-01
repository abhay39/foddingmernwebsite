

import { menuDishes } from "@/assets/listOfDishes";
import DishesComponent from "./DishesComponent";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const SpecialDishes = () => {
  const [listOfSpecialDishes, setListOfSpecialDishes]=useState([])
  const api=useSelector(item=>item.APIReducer);


  const getDishes=async()=>{
    let res = await fetch(`${api}/api/products/listofproducts`);
    res = await res.json();
    setListOfSpecialDishes(res)
  }

  useEffect(()=>{
    getDishes()
  },[])

  return (
    <div className=' min-h-screen flex flex-col '>
        <span className='text-[14px] md:text-[20px] text-red font-[700]'>SPECIAL DISHED</span>
        <h1 className='text-[30px] md:text-[60px] font-[700]'>Standout Dishes  From Our Menu</h1>

        <div className="flex flex-col justify-between md:flex-row flex-wrap gap-4 ">
          {listOfSpecialDishes?.map((item, index) => (
            <DishesComponent key={index} item={item}/>
          ))}
        </div>
    </div>
  )
}

export default SpecialDishes