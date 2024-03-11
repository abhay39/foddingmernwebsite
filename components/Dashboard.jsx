'use client'
import greetingTime  from 'greeting-time';
import { useContext, useEffect, useMemo, useState } from 'react';
import { AuthContext } from '@/hooks/auth';
import SmallComponents from './SmallComponents';
import { dashboardItems } from '@/assets/dashboardCOmps';
import SalesActivity from './SalesActivity';

const Dashboard = () => {
    const {user}=useContext(AuthContext)
    const getGreeting = greetingTime(new Date());

  return (
    <div className=' p-2 w-full'>
        <h1 className=' text-[1.2rem] font-semibold'>Hey, {user?.name}  {getGreeting}  </h1>
        
        <div className='mt-4 grid gap-4 w-full md:grid-cols-1 lg:grid-cols-3 select-none'>
          {
            dashboardItems.map((item,index)=>{
              return(
                <SmallComponents key={index} item={item} />
              )
            })
          }
        </div>

        {/* <h1 className=' text-[2rem] text-orange-600 font-bold mt-3 select-none cursor-pointer'>Your Activity</h1> */}
 
        <div className='  rounded-lg p-4 h-[430px] w-full'>
            <SalesActivity />
        </div>

    </div>
  )
}

export default Dashboard