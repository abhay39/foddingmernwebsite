import React from 'react'
import { GiNotebook } from "react-icons/gi";
import "./Reserve.css";
import { MdEmail, MdPhoneCallback } from "react-icons/md";
import { FaLocationPin } from "react-icons/fa6";


const Reservations = () => {
  return (
    <div>
        <div className=' bg-[#FFE605] p-4 rounded-md'>
            <h1 className='text-[30px] text-center md:text-[60px] font-[700]'>BOOK A TABLE</h1>
        </div>

        <form action="" className=' mt-4 p-4'>
            <div className=' flex flex-col md:flex-row gap-6 w-full'>
                <div className=''>
                    <label htmlFor="" className=' font-bold text-sm'>Date*</label><br />
                    <input type="date" className=' p-3 text-xs rounded-md w-full md:w-[350px]'/>
                </div>
                <div>
                    <label htmlFor="" className=' font-bold text-sm'>Time*</label><br />
                    <input type="time" className=' p-3 text-xs rounded-md w-full md:w-[350px]'/>
                </div>
                <div>
                    <label htmlFor="" className=' font-bold text-sm'>Guest*</label><br />
                    <select name="" id="" className=' p-3 text-xs rounded-md w-full md:w-[350px]'>
                        <option value="1">1 person</option>
                        <option value="2">2 people</option>
                        <option value="3">3 people</option>
                        <option value="4">4 people</option>
                        <option value="5">5 people</option>
                        <option value="6">6 people</option>
                    </select>

                </div>
            </div>
            <div className=' flex flex-col md:flex-row gap-6 w-full mt-4'>
                <div>
                    <label htmlFor="" className=' font-bold text-sm'>Name*</label><br />
                    <input placeholder='Your Name' type="text" className=' p-3 text-xs rounded-md w-full md:w-[350px]'/>
                </div>
                <div>
                    <label htmlFor="" className=' font-bold text-sm'>Phone*</label><br />
                    <input maxLength={10} type="number" placeholder='Enter phone number' className=' p-3 text-xs rounded-md w-full md:w-[350px]'/>
                </div>
                <div>
                    <label htmlFor="" className=' font-bold text-sm'>Email*</label><br />
                    <input  type="email" placeholder='Enter email id' className=' p-3 text-xs rounded-md w-full md:w-[350px]'/>
                </div>
            </div>
            <div className=' flex w-full items-center justify-center mt-4'>
                <button className='bookbtn flex  text-white p-3 rounded-lg items-center gap-3'> 
                    <GiNotebook />
                    Book A Table 
                </button>
            </div>
        </form>

        <div className=' bg-[#CDC1F1] h-[322px] rounded-lg flex items-center flex-col justify-center'>
            <h1 className=' text-3xl font-bold'>CONTACT US</h1>
            <div className=' mt-8 flex flex-col md:flex-row items-center gap-6'>
                <div className='flex items-center justify-center font-bold gap-3'>
                    <MdPhoneCallback />
                    <p className='text-sm'>+9779842450255</p>
                </div>
                <div className='flex items-center justify-center font-bold gap-3'>
                    <FaLocationPin />
                    <p className='text-sm'>Jeetpur-7,Bara</p>
                </div>
                <div className='flex items-center justify-center font-bold gap-3'>
                    <MdEmail  />
                    <p className='text-sm'>abhaytechhub@gmail.com</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Reservations