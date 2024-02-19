import { itemsLists } from '@/assets/listOfDishes'
import Image from 'next/image'
import React from 'react'

const PopularCategories = () => {
    
  return (
    <div className=' min-h-screen flex items-center flex-col justify-center'>
        <span className='text-[14px] md:text-[20px] text-red font-[700]'>CUSTOMER FAVORITES</span>
        <h1 className='text-[30px] md:text-[60px] font-[700]'>Popular Categories</h1>

        <div className=' flex flex-col md:flex-row gap-3 mb-2'>
            {
                itemsLists.map((item,index)=>{
                    return(
                        <div key={index} className=' h-[326px] w-[326px] bg-white flex flex-col items-center justify-center rounded-lg'>
                            <div className='h-[153px] w-[153px] rounded-full bg-[#C1F1C6] flex flex-col items-center justify-center mb-2 '>
                                <Image src={item.images} alt='itemsfood' height={100} className=' duration-500 ease-in hover:scale-110 cursor-pointer' width={100}/>
                            </div>
                                <h1 className='font-semibold text-xl'>{item.name}</h1>
                                <span>
                                    {item.totalDish}
                                </span>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default PopularCategories