"use client"
import { userNavs } from '@/assets/userNav';
import { UserActions } from '@/store/userSlice';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useLayoutEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';

// Component definition
const SideBarProfile = () => {
  const [tokens,setToken]=useState('');
  const router=useRouter();
  const url=useSelector(item=>item.APIReducer);
  const dispatch=useDispatch();
  const user=useSelector(item=>item.UserReducer);
  const userActions=UserActions;
  const [isActiveNav,setIsActiveNav]=useState("Dashboard")

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
    <div className="w-full ">
      <div className="min-h-screen bg-green">
        <div className="flex p-4 gap-3 w-full items-center">
          <Image
            src={user.profilePicture || "https://avatar.iran.liara.run/public/boy?username=aa"}
            alt="profile"
            height={80}
            width={80}
          />
          <div>
            <h1 className="font-bold text-[2rem]">
              {user?.name?.toUpperCase()}
            </h1>
            <h1>{user?.role}</h1>
          </div>
        </div>
        <hr className="border-white border-b-2" />

        <div className="p-4">
          {/* List of navlists */}
          {userNavs.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setIsActiveNav(item.name);
                router.push(`/profile/${item.nav}`)
              }}
              className={`flex gap-2 ${
                isActiveNav === item.name
                  ? 'text-white'
                  : 'text-white opacity-40'
              } text-[1.3rem] font-bold hover:bg-slate-600 rounded-lg p-3 items-center cursor-pointer mb-7 duration-500 ease-in`}
            >
              {item.icon}
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBarProfile;
