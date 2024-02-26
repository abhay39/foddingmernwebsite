"use client"
import { WhistListActions } from '@/store/whistListSlice';
import Image from 'next/image';
import React from 'react'
import toast from 'react-hot-toast';
import { MdDeleteForever } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

const page = () => {
    const wist=useSelector(item=>item.WishlistReducer);
    const dispatch=useDispatch();
    const wistlist=WhistListActions;


    const removeFromWistList=(id)=>{
        const data={
            item:id
        }
        dispatch(wistlist.remove(data))
        toast.success("Item removed from whistlist!")
    }

  return (
    <div className=' min-h-screen'>
        <h1 className=' text-3xl text-center font-bold'>Your Whistlist</h1>
            {/* <hr className=' border-red border-[1px]'/> */}
            <br />
            <br />
        <div>
            <div className='flex items-center'>
                <p className='font-bold w-2/3'>Item</p>
                <p className='font-bold w-1/3'>Price</p>
                <p className='font-bold w-1/3'>Action</p>
            </div>

            <hr className=' border-gray-300 border-[1px]'/>
        {
                wist.length>0 ? (
                    wist.map((item,index)=>{
                        
                        return(
                            <div key={index} className='flex items-center shadow-2xl mt-2 mb-2 rounded-2xl'>
                                <div className=' flex items-center gap-4 w-2/3'>
                                    <Image src={item.item.images} alt='item' height={100} width={100}/>
                                    <div>
                                        <p className='font-bold '>{item.item.name}</p>
                                        <p className=' w-3/4 text-xs'>{item.item.desc}</p>
                                    </div>
                                </div>

                                <p className='font-bold w-1/3' >Rs. {item.item.price}</p>
                                <p className='font-bold w-1/3'> 
                                    <button onClick={()=>{
                                        removeFromWistList(item.item)
                                    }} className='bg-[#D80B0B] text-center p-2 rounded-md text-white'>
                                        <MdDeleteForever />
                                    </button>
                                </p>
                                
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