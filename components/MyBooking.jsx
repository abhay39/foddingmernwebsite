import Image from 'next/image'

import { MdDeleteForever } from "react-icons/md";

const MyBooking = () => {
  return (
    <div>
        <div className=' bg-[#90BD95] p-4 rounded-md'>
            <h1 className='text-[25px] text-center md:text-[50px] font-[700] text-white'>My Booking</h1>
        </div>

        <div className=' flex px-3 mt-3 mb-3 items-center w-full justify-between'>
            <p className=' font-bold text-[1rem] md:text-[1.5rem] text-black mt-4'>Total Booking: 6</p>
            <p className=' font-bold text-[1rem] md:text-[1.5rem] text-black mt-4'>Total Price: Rs. 6</p>
            <button className='bg-[#D80B0B] p-2 rounded-md text-white'>Pay</button>
        </div>
        

        <div className=' bg-[#90BD95] text-white h-[72px] flex px-4 rounded-lg items-center w-full font-bold'>
            <span className=' w-1/4  md:w-1/5 text-center'>ITEM IMAGE</span>
            <span className=' w-1/4 md:w-1/5 text-center hidden md:block'>GUEST NUMBER</span>
            <span className=' w-1/4 md:w-1/5 text-center ' >CATEGORY</span>
            <span className=' w-1/4 md:w-1/5 text-center '>PRICE</span>
            <span className=' w-1/4 md:w-1/5 text-center'>ACTION</span>
        </div>

        <div>
            <div className='   flex px-4 rounded-lg items-center w-full mt-4 mb-2'>
                <div className=' w-1/4 md:w-1/5  items-center justify-center hidden md:flex'>
                    <Image alt='bookings'  src="/Egg salad.png" width={50} height={50}/>
                </div>
                <span className=' w-1/4 md:w-1/5 text-center'>3</span>
                <span className=' w-1/4 md:w-1/5 text-center '>Cavin</span>
                <span className='w-1/4 md:w-1/5 text-center'>Rs. 880</span>
                <div className=' flex items-center justify-center  w-1/4 md:w-1/5'>
                    <button className='bg-[#D80B0B] text-center p-2 rounded-md text-white'>
                        <MdDeleteForever />
                    </button>
                </div>
            </div>
        <hr className=' border-[1px] border-slate-200'/>
        </div>
    </div>
  )
}

export default MyBooking