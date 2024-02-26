"use client"
import { CartActions } from '@/store/cartSlice';
import Cookies from 'js-cookie';
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { FaHeart } from 'react-icons/fa';
import { FiPhoneCall } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import Searchbar from './Searchbar';

const Navbar = () => {
  const whist=useSelector(item=>item.WishlistReducer);
  const user=useSelector(item=>item.UserReducer);
  const [isToken,setIsToken]=useState('');
  const [openMode,setOpenMode] = useState(false)
  
  
  
  useLayoutEffect(() => {
    const isUser = Cookies.get("token");
    if(isUser) {
      setIsToken(isUser);
    }else{
      setIsToken('');
    }
  }, []);
  
  const handleLogout=async()=>{
    Cookies.remove("token");
    setIsToken('');
    window.location.reload();
  }
  

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
      isToken ? (
        <>
          <li>
            <details>
                <summary>{user?.name}</summary>
                <ul className="p-2">
                    <li><Link href="/profile">Profile</Link></li>
                  
                    <li><button onClick={handleLogout}>Logout</button></li>
                </ul>
            </details>
          </li>
          
        </>
      ) : (
        <li><a href='/login'>Login</a></li>
      )
    }
    {
      user?.role==='admin' && (
        <ul className="p-2">        
          <Link href="/admin"><li className=' hidden md:flex'>Admin Panel</li>
        </Link>
        </ul>
      )
    }

</>
)

return (
  <>
<div className=" sticky z-10 w-full top-0 bg-slate-100 shadow-2xl">
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
                <Image loading="lazy" src="/logo.png" alt='logo' height={50} width={100} />
            </a>
        </div>
        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
                {/* navitems */}
                {navItems}
            </ul>
        </div>
        <div className="navbar-end ">
        <button onClick={()=>setOpenMode(!openMode)} className="btn btn-ghost btn-circle ">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
          
             
              <Link href="/cart" tabIndex={0}  role="button" className="btn btn-ghost btn-circle mr-3  items-center justify-center ">
                <div className="indicator">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  <span className="badge badge-sm indicator-item">{user?.cart?.length || 0}</span>
                </div>
              </Link>
            
          
          <Link href="/whistlist" tabIndex={0}  role="button" className="btn btn-ghost btn-circle mr-3  items-center justify-center ">
            <div className="indicator">
              <FaHeart  cursor="pointer" size={25} color='red'/>
              <span className="badge badge-sm indicator-item">{whist.length}</span>
            </div>
          </Link>
            <a className="btn bg-green rounded-full hidden md:flex text-white  items-center gap-2 hover:bg-gray-300">
              <FiPhoneCall />
              Contact
            </a>
        </div>
       </div>

  </div>
       {
        openMode && (
          <Searchbar />
        )
       }
       </>
    
)
}

export default Navbar
