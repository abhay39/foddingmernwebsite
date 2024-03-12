
"use client"

import { AuthContext } from "@/hooks/auth";
import Cookies from "js-cookie";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {  useContext, useEffect } from "react";
import axios from "axios";

// http://localhost:3000/payment?q=su&oid=65ec265eaeddfa047ee727f3&amt=1515.0&refId=00070QE


const page = () => {
    
  const url = process.env.API;
    const search = useSearchParams();
    const { setUserValues, user } = useContext(AuthContext);

    useEffect(() => {
        const token = Cookies.get('token');

        const getUserDetails = async () => {
            let res = await fetch(`${url}/api/users/getUser/${token}`);
            res = await res.json();
            setUserValues(res);
        };

        if (token) {
            getUserDetails();
        }
    }, []);

    const status = search.get('q');
    const oid = search.get('oid');
    const amount = search.get('amt');
    const tidx = search.get('refId');

    const params = {
        amt: amount,
        rid: tidx,
        pid: oid,
        scd: "EPAYTEST"
    };

    const datas = {
        user: user?._id,
        params: params
    };

    useEffect(() => {
        const handleSubmit = async () => {
            try {
                let res = await axios.post(`${url}/api/payments/user/esewaPay/verify-payment`, datas);
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        };

        if (user && tidx) {
            handleSubmit();
        }
    }, [user]);


  return (
    <div className=" flex items-center justify-center min-h-screen">
      <div className=" bg-white p-8 rounded-md text-center gap-5">
      <div className="flex items-center justify-center">
        <div className=" bg-[#FF7643] p-3 h-24 w-24 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 text-white h-24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
      </div>

        <h1 className=" font-bold">Thank you for ordering</h1>
        <span className=" mt-3 font-semibold">Your order id : #{oid} </span>
        <div className="flex items-center w-full gap-3 mt-3">
          <Link href="/orders" className=" p-3 bg-white border-black border-[1px] rounded-lg dark:text-white font-bold">
            VIEW ORDER
          </Link>
          <Link href="/" className=" p-3 bg-[#FF7643] text-white font-bold rounded-lg">
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    </div>
  )
}

export default page