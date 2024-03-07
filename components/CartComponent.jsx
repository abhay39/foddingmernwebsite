"use client"
import { CartActions } from '@/store/cartSlice'
import { WhistListActions } from '@/store/whistListSlice'
import Image from 'next/image'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

const CartComponent = ({item}) => {
    
    const [totalItems,setTotalItems] =useState([]);

    const [itemQty,setItemQty]=useState(Number(item.qtyOfItem))

    const plusClicked=()=>{
        if(itemQty==10){
            toast.error("Qty cannot be greater than 10")
            setItemQty(10)
        }
        else{
            setItemQty(Number(itemQty+1))
        }
    }
    
    const subsClicked=()=>{
        if(itemQty==1){
            toast.error("Qty must be less than One")
            setItemQty(1)
            
        }
        else{
            setItemQty(Number(itemQty-1))
        }
    }

    const getItesmfromlocal=()=>{
        const localItems=JSON.parse(localStorage.getItem('items'))
        setTotalItems(localItems);
    }
    
  return (
        <div className='flex items-center shadow-2xl mt-2 mb-2 rounded-2xl py-2'>
            <div className=' flex items-center text-center md:text-left flex-col md:flex-row gap-4 w-3/4 p-2'>
                <Image src={item.imgOfItem} alt='item' height={100} width={100} className=' h-[50px] w-[50px] rounded-full md:w-[100px] md:h-[100px]'/>
                <div>
                    <p className='font-bold text-xs md:text-xl '>{item.nameOfItem}</p>
                    <p className='  hidden text-sm md:block'>{item.descOfItem}</p>
                </div>
            </div>
            <p className='font-bold text-center md:text-left text-sm w-1/4'>Rs. {item.priceOfItem}/-</p>
            
            <div className=' w-1/4 flex items-center '>
            <div>
                <button onClick={plusClicked} className="bg-green  p-2 rounded-md w-[80%] md:w-10 text-white text-sm md:text-[18px]">+</button>
                <input className="w-20 h-10 bg-slate-100 p-3 rounded-lg border-none  outline-none"  type="number" value={itemQty} name="qty" id="qty" onChange={(e)=>setItemQty(e.target.value)}/>
                <button onClick={subsClicked} className="bg-red p-2 rounded-md  w-[80%] md:w-10 text-white text-sm md:text-[18px]">-</button>
            </div>
                
            </div>
            <p className='font-bold text-center md:text-left text-[16px] w-1/4'>Rs. {itemQty * item.priceOfItem}</p>
        </div>
  )
}

export default CartComponent