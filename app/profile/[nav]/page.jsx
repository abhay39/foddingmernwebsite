"use client"

import { userNavs } from '@/assets/userNav'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import React, { useLayoutEffect, useState } from 'react'

const ProfilesNAv = ({params}) => {
    
  const [selectedNav,setIsSelectedNav]=useState(params.nav || "dashboard")

  const [isToken, setIsToken] =useState(null)
  const router=useRouter();
  
  useLayoutEffect(() => {
    const isUser = Cookies.get("token");
    console.log(isUser)
    if(isUser){
      setIsToken(isUser);
    }else{
      router.push("/login")
    }
  }, [router]);

  return (
    <div>
      {
        userNavs.map((item,index)=>{
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

export default ProfilesNAv