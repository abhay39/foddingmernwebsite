import { ListOfServices } from '@/assets/servicesList'
import Image from 'next/image'
import React from 'react'

const Services = () => {
  return (
    <div className=' min-h-screen mt-4 flex flex-col md:flex-row gap-3'>
        <div className=' flex flex-col w-full md:w-1/2 '>
            <span className='text-[14px] text-center md:hidden mt-4 md:text-[20px] text-red font-[700] '>Our Story & Services</span>
            <span className='text-[14px] hidden md:flex  mt-4 md:text-[20px] text-red font-[700] '>Our Story & Services</span>
            <h1 className='text-[30px] md:text-[60px] font-[700]'>Our Culinary Journey <br /> And Servicess</h1>
            <p className='text-[18px] text-left md:text-[26px] font-[500]'>
                “Rooted in passion, we curate unforgettable dining   experiences and offer exceptional services, blending  culinary artistry with warm hospitality.”
            </p>
            <button className=' bg-[#39DB4A] mt-6 text-center flex items-center justify-center text-[26px] text-white rounded-3xl md:w-[217px] h-[80px]'>Explore</button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 w-full md:w-1/2  gap-2'>
            {
                ListOfServices.map((item,index)=>{
                    return(
                        <div key={index} className='bg-white text-green rounded-lg md:w-[227px] w-full h-[220px] text-center  flex flex-col items-center justify-center'>
                            <Image src={item.images} alt='services item' height={50} width={50} />
                            <h1 className=' text-[24px] font-[700] '>{item.name}</h1>
                            <span className=' text-[16px] font-[600]'>
                            {item.desc}
                            </span>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Services