

import { menuDishes } from "@/assets/listOfDishes";
import DishesComponent from "./DishesComponent";


const SpecialDishes = () => {

  return (
    <div className=' min-h-screen flex flex-col '>
        <span className='text-[14px] md:text-[20px] text-red font-[700]'>SPECIAL DISHED</span>
        <h1 className='text-[30px] md:text-[60px] font-[700]'>Standout Dishes <br /> From Our Menu</h1>


        <div className="grid grid-cols-1 md:grid-cols-3">
          {
            menuDishes.map((item,index)=>{
              return(
                <DishesComponent imgLink={item.images} itemName={item.name} itemPrice={item.price} itemDesc={item.desc} itemRating={item.rating} key={index}/>
              )
            })
          }
        </div>
    </div>
  )
}

export default SpecialDishes