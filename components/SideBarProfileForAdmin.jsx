"use client"
import { adminNavs } from '@/assets/adminNav';
import { userNavs } from '@/assets/userNav';
import { UserActions } from '@/store/userSlice';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useLayoutEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { BarChart, Wallet, Newspaper,Home, BellRing, Paperclip, Brush, Wrench } from 'lucide-react'
import Link from 'next/link';

// Component definition
const SideBarProfileForAdmin = () => {
  const [tokens,setToken]=useState('');
  const router=useRouter();
  const url=process.env.API;
  
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
  },[tokens])





  return (
    <>
    <nav className="flex w-full items-start rounded-md bg-gray-100 " aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <a
            href="/"
            className="ml-1 inline-flex text-sm font-medium text-gray-800 hover:underline md:ml-2"
          >
            <Home className="mr-4 h-4 w-4" />
            Home
          </a>
        </li>
        <li>
          <div className="flex items-center">
            <span className="mx-2.5 text-gray-800 ">/</span>
            <a href="/admin" className="ml-1 text-sm font-medium text-gray-800 hover:underline md:ml-2">
              Admin
            </a>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <span className="mx-2.5 text-gray-800 ">/</span>
            <span className="ml-1 text-sm font-medium text-gray-800 hover:underline md:ml-2">
              {isActiveNav}
            </span>
          </div>
        </li>
      </ol>
    </nav>
    
    <aside className="flex h-screen w-full md:w-72 flex-col overflow-y-auto border-r bg-white px-5 py-8">
      
      <div className="mt-6 flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-6 ">
          <div className="space-y-3 ">
            {
              adminNavs.map((item, index) => (
                <ul>
                  <li onClick={()=>{
                    setIsActiveNav(item.name)
                  }} className='mb-8' key={index}>
                  <Link
                    className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300  hover:bg-gray-100 hover:text-gray-700"
                    href={`/admin/${item.nav}`}
                  >
                    {item.icon}
                    <span className="mx-2 text-sm font-medium">{item.name}</span>
                  </Link>
                  </li>
                </ul>
              ))
            }
          </div>
        </nav>
      </div>
    </aside>
    </>
  );
};

export default SideBarProfileForAdmin;
