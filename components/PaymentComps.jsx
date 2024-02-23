import React from 'react'

const PaymentComps = () => {
  return (
    <div>
        <div className=' bg-[#5F74E2] p-4 rounded-md'>
            <h1 className='text-[30px] text-center md:text-[60px] font-[700]'>Please Pay Your Bill Now!</h1>
        </div>

        <div className='flex items-center justify-center mt-4'>
            <div className=' bg-[#D9D9D9] py-8 w-full md:w-[581px] h-[600px] px-4 rounded-lg flex items-center flex-col'>
                <h1 className=' font-bold text-[1.3rem]'>Visa/Master Card</h1>
                <form action="" className=' mt-3'>
                    <input className=' bg-slate-300 rounded-lg p-3 w-[350px]' maxLength={16} type="number" placeholder='Card Number' />
                    <div className=' flex mt-4 items-center gap-12'>
                        <input type="text"  className=' bg-slate-300 rounded-lg p-3 w-[150px]' placeholder='MM/YY' />
                        <input type="text"  className=' bg-slate-300 rounded-lg p-3 w-[150px]' placeholder='CVC' />
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default PaymentComps