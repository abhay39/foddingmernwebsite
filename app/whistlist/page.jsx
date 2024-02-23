"use client"
import Image from 'next/image';
import React from 'react'
import { useSelector } from 'react-redux';

const page = () => {
    const cart=useSelector(item=>item.WishlistReducer);

    const shareItem=()=>{
        navigator.share({
            title: 'Fodding Mern Website',
            text: 'Check out this amazing website',
            url: 'https://foddingmernwebsite.vercel.app/'
        })
    }

  return (
    <div className=' min-h-screen'>
        <h1 className=' text-3xl text-center font-bold'>Your Whistlist</h1>
            {/* <hr className=' border-red border-[1px]'/> */}
            <br />
            <br />
        <div>
            <div className='flex items-center'>
                <p className='font-bold w-3/4'>Item</p>
                <p className='font-bold w-1/4'>Price</p>
            </div>

            <hr className=' border-gray-300 border-[1px]'/>
        {
                cart.length>0 ? (
                    cart.map((item,index)=>{
                        return(
                            <div key={index} className='flex items-center shadow-2xl mt-2 mb-2 rounded-2xl'>
                                <div className=' flex items-center gap-4 w-3/4'>
                                    <Image src={item.imgOfItem} alt='item' height={100} width={100}/>
                                    <div>
                                        <p className='font-bold '>{item.nameOfItem}</p>
                                        <p className=' w-3/4 text-xs'>{item.descOfItem}</p>
                                    </div>
                                </div>

                                <p className='font-bold w-1/4' >Rs. {item.priceOfItem}</p>
                                <p onClick={shareItem} className='font-bold  cursor-pointer absolute right-16'>x</p>
                            </div>
                        )
                    })
                ):
                (
                    <div className=' flex h-max items-center justify-center flex-col'>
                        <h1>No items in whistlist</h1>
                    </div>
                )
            }
            </div>
    </div>
  )
}

export default page