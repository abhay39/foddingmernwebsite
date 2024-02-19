"use client"
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useState } from 'react'
import { toast } from 'react-hot-toast';
import { FaGithub } from 'react-icons/fa';
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useSelector } from 'react-redux';
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector.js';

const page = () => {
   const url=useSelector(item=>item.APIReducer);

    const [formErrors,setFormErrors]=useState({
        emailError:'',
        passwordError:''
    })
    const [email, setEmail] = useState('');
    
    const [password, setPassword] = useState('');

    const handelLogin=async(e)=>{
        e.preventDefault();

    // Basic validation
        if (!email.trim()) {
            setFormErrors({
             ...formErrors,
                emailError:'Email is required'
            })
            return;
        }

        if (!password.trim()) {
            setFormErrors({
             ...formErrors,
                passwordError:'Password is required'
            })
            return;
        }

        if(password.length<6){
            setFormErrors({
           ...formErrors,
                passwordError:'Password must be at least 6 characters'
            })
            return;
        }
        setFormErrors({
            emailError:'',
            passwordError:''
        })

        // If validation passes, you can proceed with login logic
        let res= await fetch(`${url}/api/auth/signin`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email:email,
                password:password
            })
        })
        const status=res.status;
        res=await res.json();
        if(status===200){
            const token=res.token;
            toast.success(res.message)
            Cookies.set("token",token,{
                expires:15,path:"/"
            });
        }else{
            toast.error(res.message)
        }
        
    }
    

  return (
    <div className=' min-h-screen  select-none flex items-center justify-center flex-col'>
        <h1 className=' text-[2.2rem] md:text-[3.9rem] font-bold select-none'>Login</h1>

        <div className=' mt-3 bg-slate-200 shadow-2xl  p-3 rounded-md '>
            <label className=' font-bold' htmlFor="">Email</label>
            <br />
            <input value={email} onChange={(e) => setEmail(e.target.value)} className='p-3 focus:border-blue-700 border-none rounded-lg outline-none w-[300px] ' type="email" placeholder="Enter your email" />
            <br />
            {
                formErrors.emailError && <p className='text-red text-center text-sm'>{formErrors.emailError}</p>
            }

            <label className=' font-bold' htmlFor="">Password</label>
            <br />
            <input value={password} onChange={(e) => setPassword(e.target.value)}  className='p-3 focus:border-blue-700 border-none rounded-lg outline-none w-[300px] ' type="password" placeholder="Enter your password" />
            <br />
            {
                formErrors.passwordError && <p className='text-red text-center text-sm'>{formErrors.passwordError}</p>
            }
            <Link href="/forgotPassword" className=' flex items-end justify-end text-red'>Forgot password?</Link>

            <button onClick={handelLogin} className='bg-green w-[300px] p-3 rounded-md text-white font-semibold'>
                Sign in
            </button>
            <br />
            <p className=' text-sm text-gray-500 text-center'>{"New here? "}
                <Link className='  text-black font-semibold' href={"/signUp"}>
                    Create a new Account
                </Link>
            </p>
            <hr className='  border-blue-600 border-[1.5px]'/>

            <p className=' text-center text-sm'> Or sign in with</p>            
            
            <div className=' flex justify-around items-center mt-3'>
                <FaFacebook color="blue" className=' rounded-full rounded-green cursor-pointer' size={25}/>
                <FcGoogle   color="green" className=' rounded-full rounded-green cursor-pointer' size={25}/>
                <FaGithub color="black" className=' rounded-full rounded-green cursor-pointer' size={25} />
            </div>

        </div>
    </div>
  )
}

export default page