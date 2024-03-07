"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import  { useState } from 'react'
import { useSelector } from 'react-redux';

const ConfirmOrder = ({totalItems,totalPrice}) => {
    const user = useSelector((item) => item.UserReducer);
    // console.log(user);
    const route=useRouter();

    const [details,setDetails]=useState({
        totalQuantity: totalItems,
        totalPrice: totalPrice,
        fullname:user?.name,
        email:user?.email,
        address:'',
    })

    const handleForm=(e)=>{
      e.preventDefault();
      if(details.address.length > 0 && details.fullname.length > 0 && details.email.length > 0 ){
        route.push(`/cart/${details.address && details.totalQuantity && details.totalPrice}`,{
         query:{
          details: details
         } 
        })
      }
      else{
        
        console.log(details)
      }
    }
  return (
    <div className="  mt-8">

        <h1 className="text-4xl font-bold mb-4">Confirm Your Order</h1>

        {/* Sample Order Details */}
        <div className="bg-gray-100 p-4 mb-4 rounded-md">
        <h2 className="text-xl font-bold mb-2">Order Summary</h2>
        <p>Quantity: {totalItems}</p>
        <p>Total Price: Rs.{totalPrice}</p>
        </div>

        <div  className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">Customer Information</h2>

        {/* Sample Form Fields */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={details.fullname}
            name="name"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            placeholder="John Doe"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email Address
          </label>
          <input
            type="email"
            value={details.email}
            id="email"
            name="email"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            placeholder="john@example.com"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Delivery Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={details.address}
            onChange={(e)=>setDetails({
                ...details,
                address:e.target.value
            })}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            placeholder="jeetpur-7,bara"
          />
        </div>

        {/* Add more form fields as needed */}

        {/* Confirm Order Button */}
        <Link href={{
          pathname:'/paymentpage',
          query:{
            "address":details.address,
            "totalPrice":details.totalPrice,
            "totalQuantity":details.totalQuantity,
            "fullname":details.fullname,
            "email":details.email
          }
        }}
        className="bg-blue-500 w-full text-white px-4 py-2 rounded"
        >
          Confirm Order
        </Link>
      </div>
    </div>
  )
}

export default ConfirmOrder