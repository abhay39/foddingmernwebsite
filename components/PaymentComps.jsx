import React from 'react'

const PaymentComps = () => {
  return (
    <div>
        <div className=' bg-[#5F74E2] p-4 rounded-md'>
            <h1 className='text-[25px] text-center md:text-[50px] font-[700] text-white'>Please Pay Your Bill Now!</h1>
        </div>

        <div className='flex items-center justify-center mt-4'>
            <div className=' bg-[#D9D9D9] py-12 w-full md:w-[581px]  px-4 rounded-lg flex items-center flex-col'>
                <h1 className=' font-bold text-[1.3rem]'>Visa/Master Card</h1>
                <form action="" className=' mt-3'>
                    <input className=' bg-slate-300 rounded-lg p-3 w-[350px]' maxLength={16} type="number" placeholder='Card Number' />
                    <div className=' flex mt-4 items-center gap-12'>
                        <input type="text"  className=' bg-slate-300 rounded-lg p-3 w-[150px]' placeholder='MM/YY' />
                        <input type="text"  className=' bg-slate-300 rounded-lg p-3 w-[150px]' placeholder='CVC' />
                    </div>
                    <button className=' p-2  mt-4 rounded-lg w-[350px] text-center font-bold text-white bg-[#820DF8]'>Pay</button><br />
                    <button  className=' p-2 rounded-lg w-[350px] text-center font-bold text-white bg-[#3806FF] mt-3'>via Paypal</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default PaymentComps