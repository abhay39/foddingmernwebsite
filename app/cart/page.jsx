"use client"
import CartComponent from '@/components/CartComponent'
import { useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux'

const page = () => {

    const cart=useSelector(item=>item.CartReducer);
    const [getCartLength,setGetCartLength]=useState([]);
    
    useLayoutEffect(()=>{
        const getLengths=localStorage.getItem('carts');
        setGetCartLength(JSON.parse(getLengths));
    },[])

  return (
    <div className='  min-h-screen '>
        <h1 className=' text-3xl text-center font-bold mt-4'>Your Cart</h1>
            {/* <hr className=' border-red border-[1px]'/> */}
            <br />
            <br />
        <div>
            <div className='flex items-center'>
                <p className='font-bold w-3/4'>Item</p>
                <p className='font-bold w-1/4'>Price</p>
                <p className='font-bold w-1/4'>Qty</p>
                <p className='font-bold w-1/4'>Total</p>
            </div>
            <hr className=' border-gray-300 border-[1px]'/>

            {
                getCartLength?.length>0 ? (
                    getCartLength?.map((item,index)=>{
                        return(
                            <CartComponent key={index}  item={item}/>
                        )
                    })
                ):
                (
                    <div className=' flex h-max items-center justify-center flex-col'>
                        <h1>No items in cart</h1>
                    </div>
                )
            }

        </div>
    </div>
  )
}

export default page