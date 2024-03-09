"use client"
import Banner from '@/components/Banner'
import PopularCategories from '@/components/PopularCategories'
import Services from '@/components/Services'
import SpecialDishes from '@/components/SpecialDishes'
import Testimonials from '@/components/Testimonials'
import { AuthContext } from '@/hooks/auth'
import { UserActions } from '@/store/userSlice'
import Cookies from 'js-cookie'
import { useContext, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const HomePage = () => {
  const url=process.env.API;
  const {setUserValues} =useContext(AuthContext);

  useLayoutEffect(()=>{
    const token=Cookies.get('token');

    const getUserDetails=async()=>{
      let res=await fetch(`${url}/api/users/getUser/${token}`);
      res= await res.json();
      // console.log(res)
      setUserValues(res);
    }
    if(token){
      getUserDetails()
    }
  },[])

  return (
    <div>
      <Banner />
      <PopularCategories />
      <SpecialDishes />
      <Testimonials />
      <Services />
    </div>
  )
}

export default HomePage