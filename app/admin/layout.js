"use client"
// import SideBarProfile from "@/components/SideBarProfile";
import SideBarProfileForAdmin from "@/components/SideBarProfileForAdmin";
import { AuthContext } from "@/hooks/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useContext, useLayoutEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";



export default function RootLayout({ children }) {
  const router=useRouter();

  const {isAuthenticated,user,setIsAuthenticatedWhenLoggedIn,setUserValues} =useContext(AuthContext)
  const url=process.env.API;

  useLayoutEffect(()=>{
    const token=Cookies.get('token');

    const getUserDetails=async()=>{
      let res=await fetch(`${url}/api/users/getUser/${token}`);
      res= await res.json();
      console.log(res)
      setUserValues(res);
      setIsAuthenticatedWhenLoggedIn()
    }
    if(token){
      getUserDetails()
    }
  },[])

  if(isAuthenticated) {
    if(user.role!="admin") {
      toast.error("You are user so you are not allowed to access admin panel");
      
        router.push("/")
      
    }
  }



  return (
    <div className={` p-3 md:px-10 flex flex-col lg:flex-row gap-10 w-full bg-slate-100 min-h-screen `}>
        <div className=" w-full  md:w-1/3 ">
          <SideBarProfileForAdmin />
        </div>
        <div className=" w-full ">
          {children}
        </div>
    </div>
  );
}
