"use client"

import Categories from '@/components/Categories'
import DishesComponent from '@/components/DishesComponent'
import React, { useEffect, useState } from 'react'


const AllItems = () => {
  const [listOfSpecialDishes, setListOfSpecialDishes]=useState([])
  const url=process.env.API;
  const [category,setCategory]=useState('All');
  const [sort,setSort]=useState(1)


  

  const changeCategory=(item)=>{
    setCategory(item);
  }
  const changeSort=(item)=>{
    setSort(item);
  }

  


  useEffect(()=>{
    const getDishes=async()=>{
      let res = await fetch(`${url}/api/products/listofproducts/${category}/${sort}`);
      res = await res.json();
      setListOfSpecialDishes(res)
    }
    getDishes()
  },[category,sort,url]);

  return (
    <>
      <div className=' min-h-screen flex items-center justify-center flex-col'>
        <h1 className='text-[35px] md:text-[60px] text-center font-[700]'>For the Love of Delicious
          <span className=' text-green'> Food</span>
        </h1> 
        <span className='text-[16px] md:text-[24px] text-gray-600 text-center font-[500]'>
        Come with family & feel the joy of mouthwatering food such as Greek Salad, Lasagne, Butternut <br /> Pumpkin, Tokusen Wagyu, Olivas Rellenas and more for a moderate cost
        </span>
        <button className=' w-[230px] h-[80px] p-4 rounded-3xl text-[24px] shadow-red shadow-2xl font-[500] bg-green mt-3 text-white flex items-center justify-center'>
          Order Now
        </button>

        {/* displaying all the categories */}
      </div>
      <Categories changeCat={changeCategory} changeSort={changeSort}/>

      <div className="flex md:mt-4 justify-between flex-wrap">
      {
        listOfSpecialDishes.length>0 ? (
          listOfSpecialDishes.map((item,index)=>{
            return(
              <DishesComponent key={index} item={item} />
            )
          })
        ):(
          <div className=' min-h-screen flex items-center justify-center'>
            <h1 className=' text-3xl font-bold'>No dishes to shows😒😒😒</h1>
          </div>
        )
      }
      </div>
    </>
  )
}

export default AllItems