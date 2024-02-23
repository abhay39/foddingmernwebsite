"use client"
// import LeftSideNavabar from "@/components/LeftSideNavabar";
import RightSideNavabar from "@/components/RightSideNavBar";
import { UserActions } from "@/store/userSlice";
import Cookies from "js-cookie";
import Image from "next/image"
import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDashboard } from "react-icons/md";
import { userNavs } from "@/assets/userNav";
import Dashboard from "@/components/Dashboard";
import Reservations from "@/components/Reservations";
import PaymentComps from "@/components/PaymentComps";

const page = () => {
  const [isActiveNav,setIsActiveNav] =useState("Payments History");
  const user=useSelector(item=>item.UserReducer);

  const [tokens,setToken]=useState('');
  const url=useSelector(item=>item.APIReducer);
  const dispatch=useDispatch();
  const userActions=UserActions;

  useLayoutEffect(()=>{
      const token=Cookies.get('token');

      setToken(token)

      const getUserDetails=async()=>{
      let res=await fetch(`${url}/api/auth/${token}`);
      res= await res.json();
      dispatch(userActions.addUserDetails(res))
      }
      getUserDetails()
  },[])
    
  return (
    <div className=" min-h-screen mt-3 flex flex-col md:flex-row justify-between gap-4">
        <div className=" w-full md:w-1/4 ">
          <div className=" min-h-screen bg-green">
            <div className=" flex p-4 gap-3  w-full items-center">
                <Image 
                src={user.profilePicture}
                alt="profile"
                height={80}
                width={80}
            />
                <div>
                    <h1 className=" font-bold text-[2rem]">{user?.name?.toUpperCase()}</h1>
                    <h1>{user.name}</h1>
                </div>
            </div>
            <hr className=" border-white border-b-2"/>

            <div className=" p-4">
                {/* list of navlists */}
                
                {
                    userNavs.map((item)=>(
                        <div onClick={()=>{
                            setIsActiveNav(item.name)
                        }} key={item.id} className={`flex gap-2 ${isActiveNav===item.name ? "text-white" : "text-white opacity-40"} text-[1.3rem] font-bold hover:bg-slate-600 rounded-lg p-3 items-center cursor-pointer mb-7 duration-500 ease-in`}>
                            {item.icon}
                            <p>{item.name}</p>
                        </div>
                    ))
                }
              

            </div>
                
          </div>
        </div>
        <div className=" w-full">
          {
            isActiveNav==='Dashboard' &&(
              <Dashboard />
            )
          }
          {
            isActiveNav==='Reservations' &&(
              <Reservations />
            )
          }
          {
            isActiveNav==='Payments History' &&(
              <PaymentComps />
            )
          }
        </div>
    </div>
  )
}

export default page