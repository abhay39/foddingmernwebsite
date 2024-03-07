"use client"
import { adminNavs } from '@/assets/adminNav';
import TotalUsers from '@/components/TotalUsers';
import React, { useState } from 'react'

const page = ({params}) => {
 

  const [selectedNav,setIsSelectedNav]=useState(params.nav || "dashboard")
  
  
  return (
    <div className=' min-h-screen'>
      {
        adminNavs.map((item,index)=>{
          if(item.nav===selectedNav){
            return(
              <div className=' min-h-screen' key={index}>
                {item.page}
              </div>
            )
          }
        })
      }
    </div>
  )
}

export default page