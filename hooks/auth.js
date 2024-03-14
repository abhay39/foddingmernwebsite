"use client"
import Cookies from 'js-cookie';
import {createContext, useState} from 'react';
import toast from 'react-hot-toast';

export const AuthContext=createContext()


const AuthProvider=({children})=>{

  const [isAuthenticated,setIsAuthenticated]=useState(false)
  const [user,setUser]=useState(null)

  const login=(userData)=>{
      Cookies.set('token',userData.token)
      setIsAuthenticated(true)
      setUser(userData.user)
  }

  const setIsAuthenticatedWhenLoggedIn=()=>{
    setIsAuthenticated(true)
  }

  const setUserValues=(userData)=>{
      setUser(userData)
      setIsAuthenticated(true)
  }

  const logout=()=>{
      Cookies.remove('token')
      toast.success("Logout Success")
      setIsAuthenticated(false)
      setUser(null)
      window.location.href="/"
  }

  const updatedValues={
    isAuthenticated,
    user,
    login,
    logout,
    setUserValues,
    setIsAuthenticatedWhenLoggedIn
  }

  return(
    <AuthContext.Provider value={updatedValues}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider