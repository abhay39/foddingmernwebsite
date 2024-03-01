"use client"
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaFilter } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

const Categories = ({changeCat, changeSort}) => {
    const [isNavClicked,setIsNavClicked]=useState(false);
    const [isSelectedCategory,setSelectedCategory]=useState("All")

  return (
    <>
    
    <div className=' flex flex-wrap   items-start justify-between'>
        <GiHamburgerMenu onClick={()=>setIsNavClicked(!isNavClicked)} size={30}  className=' md:hidden mb-3 cursor-pointer'/>
        
            <div className=' hidden  md:block'>
            <ul className='flex gap-6 cursor-pointer font-semibold select-none '>
                        <li onClick={()=>{
                            setSelectedCategory('All')
                            changeCat('All')
                        }}  className={`  text-xl ${isSelectedCategory==='All'?"text-green underline":"text-black"} font-semibold  cursor-pointer w-full hover:text-green rounded-lg`}>All</li>
                        <li onClick={()=>{
                            setSelectedCategory('Salad')
                            changeCat('Salad')
                        }} className={`  text-xl ${isSelectedCategory==='Salad'?"text-green underline":"text-black"} font-semibold  cursor-pointer w-full hover:text-green rounded-lg`}>Salad</li>
                        <li onClick={()=>{
                            setSelectedCategory('Pizza')
                            changeCat('Pizza')
                        }} className={`  text-xl ${isSelectedCategory==='Pizza'?"text-green underline":"text-black"} font-semibold hover:text-green cursor-pointer w-full rounded-lg`}>Pizza</li>
                        <li onClick={()=>{
                            setSelectedCategory('Soups')
                            changeCat('Soups')
                        }} className={`  text-xl ${isSelectedCategory==='Soups'?"text-green underline":"text-black"} font-semibold hover:text-green cursor-pointer w-full  rounded-lg`}>Soups</li>
                        <li onClick={()=>{
                            setSelectedCategory('Desserts')
                            changeCat('Desserts')
                        }} className={`  text-xl ${isSelectedCategory==='Desserts'?"text-green underline":"text-black"} font-semibold hover:text-green cursor-pointer w-full rounded-lg`}>Desserts</li>
                        <li onClick={()=>{
                            setSelectedCategory('Drinks')
                            changeCat('Drinks')
                        }} className={`  text-xl ${isSelectedCategory==='Drinks'?"text-green underline":"text-black"} font-semibold hover:text-green cursor-pointer w-full  rounded-lg`}>Drinks</li>
                    </ul>
            </div>
            <div>
                <details className=' bg-slate-600 p-3 rounded-md'>
                <summary className=' flex gap-2 items-center bg-slate-600 p-2 w-[200px] rounded-lg select-none text-white'><FaFilter />Filter</summary>
                <ul className="p-2">
                    <li onClick={()=>{
                        changeSort(1);
                    }} className=' bg-slate-400 active:text-white p-2 cursor-pointer mb-2 rounded-lg'><a>Price- Low to High</a></li>
                    <li onClick={()=>{
                        changeSort(-1);
                    }}  className=' bg-slate-400 p-2 cursor-pointer mb-2 rounded-lg'><a>Price- High to Low</a></li>
                    
                </ul>
            </details>
            </div>
        </div>

        {
            isNavClicked && (
                <div className='flex mt-2 select-none z-50  bg-slate-300 rounded-md  p-3 flex-col md:flex-row items-start justify-between'>
                    <ul className='cursor-pointer font-semibold select-none '>
                        <li onClick={()=>{
                            setSelectedCategory('All')
                            changeCat('All')
                        }}  className={`  text-xl ${isSelectedCategory==='All'?"text-green underline":"text-black"} font-semibold hover:bg-gray-400 hover:text-white cursor-pointer w-full hover:p-2 rounded-lg`}>All</li>
                        <li onClick={()=>{
                            setSelectedCategory('Salad')
                            changeCat('Salad')
                        }} className={`  text-xl ${isSelectedCategory==='Salad'?"text-green underline":"text-black"} font-semibold hover:bg-gray-400 hover:text-white cursor-pointer w-full hover:p-2 rounded-lg`}>Salad</li>
                        <li  onClick={()=>{
                            setSelectedCategory('Pizza')
                            changeCat('Pizza')
                        }} className={`  text-xl ${isSelectedCategory==='Pizza'?"text-green underline":"text-black"} font-semibold hover:bg-gray-400 hover:text-white cursor-pointer w-full hover:p-2 rounded-lg`}>Pizza</li>
                        <li onClick={()=>{
                            setSelectedCategory('Soups')
                            changeCat('Soups')
                        }} className={`  text-xl ${isSelectedCategory==='Soups'?"text-green underline":"text-black"} font-semibold hover:bg-gray-400 hover:text-white cursor-pointer w-full hover:p-2 rounded-lg`}>Soups</li>
                        <li  onClick={()=>{
                            setSelectedCategory('Desserts')
                            changeCat('Desserts')
                        }} className={`  text-xl ${isSelectedCategory==='Desserts'?"text-green underline":"text-black"} font-semibold hover:bg-gray-400 hover:text-white cursor-pointer w-full hover:p-2 rounded-lg`}>Desserts</li>
                        <li onClick={()=>{
                            setSelectedCategory('Drinks')
                            changeCat('Drinks')
                        }} className={`  text-xl ${isSelectedCategory==='Drinks'?"text-green underline":"text-black"} font-semibold hover:bg-gray-400 hover:text-white cursor-pointer w-full hover:p-2 rounded-lg`}>Drinks</li>
                    </ul>
                </div>
            )
        }
    </>
  )
}

export default Categories