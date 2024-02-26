import React from 'react'

const PaymentHistory = () => {
  return (
    <div>
        <div className=' bg-[#5F74E2] p-4 rounded-md'>
            <h1 className='text-[25px] text-center md:text-[50px] font-[700] text-white'>PAYMENT HISTORTY</h1>
        </div>

        <p className=' font-bold text-[1.5rem] text-black mt-4'>Total Payments: 6</p>

        <div className=' bg-[#90BD95] text-center text-white h-[72px] flex px-4 rounded-lg items-center w-full'>
            <span className=' w-1/3 md:w-1/4'>EMAIL</span>
            <span className=' w-1/3 md:w-1/4 hidden md:block'>CATEGORY</span>
            <span className=' w-1/3 md:w-1/4'>TOTAL PRICE</span>
            <span className=' w-1/3 md:w-1/4'>PAYMENT DATE</span>
        </div>

        <div>
            <div className=' text-center  flex px-4 rounded-lg items-center w-full mt-4'>
                <span className=' w-1/3 md:w-1/4'>EMAIL</span>
                <span className='w-1/3 md:w-1/4 hidden md:block'>CATEGORY</span>
                <span className=' w-1/3 md:w-1/4'>TOTAL PRICE</span>
                <span className='w-1/3 md:w-1/4'>PAYMENT DATE</span>
            </div>
        <hr className=' border-[1px] border-slate-200'/>
        </div>
    </div>
  )
}

export default PaymentHistory