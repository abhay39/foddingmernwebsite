"use client"
import Cookies from 'js-cookie';
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FiPhoneCall } from "react-icons/fi";

const Navbar = () => {
  const [isToken,setIsToken]=useState('');
  const [showProfile,setShowProfile]=useState(false);

  useEffect(()=>{
    const isUser=Cookies.get("token");
    setIsToken(isUser);
    // console.log(isUser)
  },[])

const navItems=(
<>
    <li><a href='/'>Home</a></li>
    <li>
      <details>
          <summary>Menu</summary>
          <ul className="p-2">
              <li><Link href="/Menu/all">All</Link></li>
              <li><a>Salad</a></li>
              <li><a>Pizza</a></li>
          </ul>
      </details>
    </li>
    <li>
      <details>
          <summary>Services</summary>
          <ul className="p-2">
              <li><a>Online Order</a></li>
              <li><a>Table Booking</a></li>
              <li><a>Order Tracking</a></li>
          </ul>
      </details>
    </li>

    <li><a>Offers</a></li>
    {
      isToken? (<>
        <li className={` hover:${setShowProfile(true)}`}><a href='/profile'>Abhay</a></li>
        <li className=' md:hidden'><a href='/cart'>My Cart</a></li>
        {/* {
          showProfile?(<>
            <li className=' '><a href='/cart'>Profile</a></li>
            <li className=' '><a href='/cart'>Logout</a></li>
          </>) :(null)
        } */}
      </>
      ):(<li><a href='/login'>Login</a></li>)
    }

</>
)

return (
<div>
    <div className="navbar ">
        <div className="navbar-start ">
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </div>
                <ul tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    {navItems}
                </ul>
            </div>
            <a className="btn btn-ghost text-xl" href='/'>
                <Image src="/logo.png" alt='logo' height={50} width={100} />
            </a>
        </div>
        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
                {/* navitems */}
                {navItems}
            </ul>
        </div>
        <div className="navbar-end ">
        <button className="btn btn-ghost btn-circle hidden lg:flex">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle mr-3 hidden lg:flex items-center justify-center ">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </div>
            <a className="btn bg-green rounded-full text-white flex items-center gap-2 hover:bg-gray-300">
              <FiPhoneCall />
              Contact
            </a>
        </div>
       </div>
  </div>
    
)
}

export default Navbar
