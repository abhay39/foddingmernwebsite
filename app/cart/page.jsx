"use client"
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Trash, Heart } from 'lucide-react'
import { AuthContext } from '@/hooks/auth';
import CheckoutThree from '@/components/CheckOutPage';
import Cookies from 'js-cookie';
import Image from 'next/image';



const Page = () => {
  const url=process.env.API;
  const {user}=useContext(AuthContext)
  const [totalCarts,setTotalCarts]=useState('')
  const [listOfPrices,setListOfPrices]=useState({
    totalPrice:0,
    discount:0,
    delivery:0
  })
  const [openModel,setOpenModel]=useState(false);


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
  },[url, setUserValues])

  //  console.log(user)

   useEffect(()=>{
    const getCart=async()=>{
      let res= await fetch(`${url}/api/carts/user/totalCarts/${user?._id}`)
      res= await res.json();
      setTotalCarts(res)
    }
    if(user && user._id){
      getCart();
    }
  },[url,user])

  useEffect(() => {
    let a = 0; // Initialize a to zero
    let b = 0; // Initialize b to zero
  
    totalCarts?.products?.map((item) => {
      a += (item.product.totalPrice - item.product.discountPrice) * item.quantity;
      b += item.product.discountPrice * item.quantity;
      console.log(a, b);
    });
  
    setListOfPrices({
      totalPrice: a,
      discount: b,
      delivery: 0,
    });
  }, [totalCarts]);

  // console.log(totalCarts)

  return (
    <>
    
    <div className="mx-auto flex w-full flex-col space-y-4 p-6 px-2 sm:p-10 sm:px-2">
      <h2 className="text-3xl font-bold">Your cart</h2>
      
      <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-8">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>
            <ul role="list" className="divide-y divide-gray-200">
              {totalCarts?.products?.map((product) => (
                <div key={product._id} className="">
                  <li className="flex py-6 px-2 sm:py-6 ">
                    <div className="flex-shrink-0">
                      <Image
                        src={product.product.image}
                        alt={product.product.name}
                        height={38}
                        width={38}
                        className="sm:h-38 sm:w-38 h-24 w-24 rounded-full object-contain object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className=" justify-between w-full">
                            <h3 className="text-xl font-bold">
                                {product.product.name}
                            </h3>
                            <p>{product.product.description}</p>
                          </div>
                          
                          <div className="mt-1 flex items-end">
                            <p className="text-xs font-medium text-gray-500 line-through">
                            &#8377;{product.product.totalPrice * product.quantity}/-
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                            &#8377;{(product.product.totalPrice - product.product.discountPrice) * product.quantity}
                            </p>
                            &nbsp;&nbsp;
                            <p className="text-sm text-green font-medium text-green-500">&#8377;{product.product.discountPrice * product.quantity} off</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <div className="mb-2 flex">
                    <div className="min-w-24 flex">
                      <button type="button" className="h-7 w-7">
                        -
                      </button>
                      <input
                        type="text"
                        className="mx-1 h-7 w-9 rounded-md border text-center"
                        defaultValue={product.quantity}
                      />
                      <button type="button" className="flex h-7 w-7 items-center justify-center">
                        +
                      </button>
                    </div>
                    <div className="ml-6 flex text-sm">
                      <button type="button" className="flex items-center space-x-1 px-2 py-1 pl-0">
                        <Trash size={12} className="text-red-500" />
                        <span className="text-xs font-medium text-red-500">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          </section>
          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
          >
            <h2
              id="summary-heading"
              className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
            >
              Price Details
            </h2>
            <div>
              <dl className=" space-y-1 px-2 py-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-800">Price ({totalCarts?.products?.length || 0} items)</dt>
                  <dd className="text-sm font-medium text-gray-900">₹ {listOfPrices.totalPrice}</dd>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <dt className="flex items-center text-sm text-gray-800">
                    <span>Discount</span>
                  </dt>
                  <dd className="text-sm font-medium text-green-700">- ₹ {listOfPrices.discount}</dd>
                </div>
                <div className="flex items-center justify-between py-4">
                  <dt className="flex text-sm text-gray-800">
                    <span>Delivery Charges</span>
                  </dt>
                  <dd className="text-sm font-medium text-green-700">Free</dd>
                </div>
                <div className="flex items-center justify-between border-y border-dashed py-4 ">
                  <dt className="text-base font-medium text-gray-900">Total Amount</dt>
                  <dd className="text-base font-medium text-gray-900">₹ {listOfPrices.totalPrice + listOfPrices.delivery}</dd>
                </div>
              </dl>
              <div className="px-2 pb-4 font-medium text-green-700">
                You will save ₹ {listOfPrices.discount} on this order
              </div>
              <button onClick={()=>{
                setOpenModel(!openModel)
              }} className=' w-full p-3 rounded-md text-white bg-black'>
                Proceed for payment
              </button>
            </div>
          </section>
        </div>
    </div>
    {
      openModel && (
        <div className=' min-h-screen absolute top-0 left-0 backdrop-blur-sm w-full'>
          <div className=' flex items-center justify-center'>
            <CheckoutThree totalCart={totalCarts} listOfPrices={listOfPrices}/>
          </div>
        </div>
      )
    }
    </>
  );
};

export default Page;
