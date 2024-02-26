
"use client"
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux'

const page = () => {
  // const user=useSelector(item=>item.UserReducer)

  // const [isToken, setIsToken] =useState(null)
  // const router=useRouter();
  
  // useLayoutEffect(() => {
  //   const isUser = Cookies.get("token");
  //   // console.log(isUser)
  //   if(isUser){
  //     // setIsToken(isUser);
  //     console.log(user)
  //   }else{
  //     router.push("/login")
  //   }
  // }, []);

  return (
    <div>admin</div>
  )
}

export default page