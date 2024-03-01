"use client"
import { adminNavs } from '@/assets/adminNav';
import TotalUsers from '@/components/TotalUsers';
import React, { useState } from 'react'

const page = ({params}) => {
  // console.log(params)
  const [selectedNav,setIsSelectedNav]=useState(params.nav || "dashboard")
  
  return (
    <div>
      {
        adminNavs.map((item,index)=>{
          if(item.nav===selectedNav){
            return(
              <div key={item.id}>
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