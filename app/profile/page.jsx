"use client"

import Dashboard from "@/components/Dashboard"
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";

const ProfileMainPage = () => {
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
  }, [isToken,router]);

  return (
    <div className=" w-full ">
        <Dashboard />
    </div>
  )
}

export default ProfileMainPage