"use client"
import Banner from '@/components/Banner'
import PopularCategories from '@/components/PopularCategories'
import Services from '@/components/Services'
import SpecialDishes from '@/components/SpecialDishes'
import Testimonials from '@/components/Testimonials'
import { UserActions } from '@/store/userSlice'
import Cookies from 'js-cookie'
import { useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const HomePage = () => {
  const [tokens,setToken]=useState('');
  const url=useSelector(item=>item.APIReducer);
  const dispatch=useDispatch();
  const userActions=UserActions;

  useLayoutEffect(()=>{
    const token=Cookies.get('token');

    setToken(token)

    const getUserDetails=async()=>{
      let res=await fetch(`${url}/api/users/getUser/${token}`);
      res= await res.json();
      dispatch(userActions.addUserDetails(res))
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