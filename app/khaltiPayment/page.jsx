
"use client"

"use client"

import { AuthContext } from "@/hooks/auth";
import Cookies from "js-cookie";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {  useContext, useEffect } from "react";

// http://localhost:3000/payment?status=Completed&t=txn&idx=icAoZikygAq9ZKPBdcN4mG&token=XqTpNvXr5wL2v2vB8FN569&bank_reference=None&amount=12500&mobile=98XXXXX866&transaction_id=icAoZikygAq9ZKPBdcN4mG&tidx=icAoZikygAq9ZKPBdcN4mG&total_amount=12500&purchase_order_id=65ebd511e7b0ec554cf6ee5c&purchase_order_name=foods&pidx=oU4YRxAfqnwQtscJw4ZjZD

const page = () => {

  const {setUserValues,user} =useContext(AuthContext);

  useEffect(()=>{
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

  const url=process.env.API;
  const search=useSearchParams();

  const status=search.get('status');
  const idx=search.get('idx');
  const token=search.get('token');
  const bank_reference=search.get('bank_reference');
  const amount=search.get('amount');
  const transaction_id=search.get('transaction_id');
  const tidx=search.get('tidx');
  const pidx=search.get('pidx');
  const purchase_order_id=search.get('purchase_order_id');

  
  const verifyPayment=async()=>{
    const data={
      "pidx": pidx,
    }
    
    let res=await fetch(`${url}/api/payments/user/khaltiPay/verify-payment`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
        user:user._id,
        status:status,
        idx:idx,
        token:token,
        bank_reference:bank_reference,
        amount:amount,
        transaction_id:transaction_id,
        tidx:tidx,
        pidx:data,
        orderId:purchase_order_id
      })
    })
    res= await res.json();
    console.log(res)
  }
  
  useEffect(()=>{
    if(user && pidx){
      verifyPayment()
    }
  },[user,pidx])


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
        <span className=" mt-3 font-semibold">Your order id : #{purchase_order_id} </span>
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