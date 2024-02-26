'use client'
import { useSelector } from 'react-redux';
import greetingTime  from 'greeting-time';

const Dashboard = () => {
    const user=useSelector(item=>item.UserReducer);
    const getGreeting = greetingTime(new Date());

  return (
    <div className=' p-2 w-full'>
        <h1 className=' text-[1.2rem] font-semibold'>Hey, {getGreeting} welcome back!!!   {user?.name} </h1>

        <div className='mt-4 flex flex-col md:flex-row gap-4 flex-wrap-reverse   justify-between select-none'>
            <div className=' bg-[#00C2FF] w-full md:w-[250px] h-[182px] flex items-center flex-col justify-center text-[2rem] font-bold rounded-lg cursor-pointer'>
                <h1>ORDERS</h1>
                <p>{user?.orders?.length || 0}</p>
            </div>

            <div className=' bg-[#FFE605] w-full md:w-[260px] h-[182px] flex items-center flex-col justify-center text-[2rem] font-bold rounded-lg cursor-pointer'>
                <h1>RESERVATIONS</h1>
                <p>{user?.reservations?.length || 0}</p>
            </div>

            <div className=' bg-[#7d74e3] w-full md:w-[250px]  h-[182px] flex items-center flex-col justify-center text-[2rem] font-bold rounded-lg cursor-pointer'>
                <h1>CART</h1>
                <p>{user?.cart?.length || 0}</p>
            </div>
        </div>

        <h1 className=' text-[2rem] text-orange-600 font-bold mt-3 select-none cursor-pointer'>Your Activity</h1>
 
        <div className=' bg-[#00C2FF] rounded-lg p-4 h-[430px] w-full'>
            
        </div>

    </div>
  )
}

export default Dashboard