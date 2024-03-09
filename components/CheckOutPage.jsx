"use client"
import { AuthContext } from '@/hooks/auth'
import axios from 'axios'
import { Home, ChevronRight, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { useContext, useState } from 'react'

const steps = ['Personal Information', ]

export default function CheckoutThree({totalCart,listOfPrices}) {
    const {user}=useContext(AuthContext)
    const url=process.env.API;

    const [details,setDetails]=useState({
        products: totalCart?.products,
        amount: (listOfPrices?.totalPrice + listOfPrices?.delivery) ,
        fullName:'',
        contactNumber:'',
        address:'',
        paymentMethod:'',
        user:user._id
    })

    const handleChange=(e)=>{
        setDetails({
        ...details,
        [e.target.name]:e.target.value,
        })
    }

    const khalti = async (item) => {
        // console.log(item)
        const payload = {
          return_url: "http://localhost:3000/khaltiPayment",
          website_url: "http://localhost:3000/",
          amount: item.amount * 10,
          purchase_order_id: item._id,
          purchase_order_name: "foods",
          customer_info: {
            name: item.fullName,
            number: item.contactNumber,
            address: item.address
          }
        };
        console.log(payload)
        try {
          let response = await axios.post(`${url}/api/payments/user/khaltiPay`, payload);
          console.log(response.data);
          window.location.href = `${response?.data?.data?.payment_url}`;
        } catch (error) {
            console.error("An error occurred:", error);
            // Handle the error, e.g., display an error message to the user
        }
      
      };

      const esewa=(item)=>{
        console.log(item)
        var path="https://uat.esewa.com.np/epay/main";
        var params= {
            amt: item?.amount,
            psc: 10,
            pdc: 0,
            txAmt: 5,
            tAmt: item?.amount+10+5,
            pid: item._id,
            scd: "EPAYTEST",
            su: "http://localhost:3000/esewaPayment?q=su",
            fu: "http://localhost:3000/failPayment?q=fu",
        }
    
            var form = document.createElement("form");
            form.setAttribute("method", "POST");
            form.setAttribute("action", path);
    
            for(var key in params) {
                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", params[key]);
                form.appendChild(hiddenField);
            }
    
            document.body.appendChild(form);
           form.submit();
            
      }

    const handleNextStep=async()=>{
        let res=await fetch(`${url}/api/orders/user/createOrder`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(details)
        })
        res=await res.json()
        console.log(res)
        if(details.paymentMethod==='esewa'){
          esewa(res.result)
        }else{
          khalti(res.result)
        }
    }

  return (
    <div className="w-full min-h-screen  bg-slate-100 py-2 flex items-center justify-center flex-col">
      <div className=" my-4  md:my-6">
        {/* breadcrumb */}
        <nav className="mb-8 flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a
                href="#"
                className="ml-1 inline-flex text-sm font-medium text-gray-900 hover:underline md:ml-2"
              >
                <Home size={16} className="mr-2 text-gray-900" />
                Cart
              </a>
            </li>
            {steps.map((step) => (
              <li key={step}>
                <div className="flex items-center">
                  <ChevronRight size={16} className="mr-2 text-gray-600" />
                  <a
                    href="#"
                    className="ml-1 text-sm font-medium text-gray-900 hover:underline md:ml-2"
                  >
                    {step}
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </nav>
        {/* Form */}
        <div className="overflow-hidden rounded-xl bg-white p-4 shadow">
          <div className="mb-4 flex items-center rounded-lg py-2">
            <div className="mr-2 rounded-full bg-gray-100  p-2 text-black">
              <ShoppingCart size={20} />
            </div>
            <div className="flex flex-1">
              <p className="text-sm font-medium">
                You have <strong>{totalCart?.products?.length}</strong> items in cart. Sub total is <strong>₹{listOfPrices.totalPrice + listOfPrices.delivery}</strong>
              </p>
            </div>
            {/* <button
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              View Items
            </button> */}
          </div>
          <p className="text-sm font-bold text-gray-900">Personal Info</p>
          <div className="mt-6 gap-6 space-y-4 md:grid md:grid-cols-2 md:space-y-0">
            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="firstName"
              >
                FullName
              </label>
              <input
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                id="firstName"
              ></input>
            </div>

            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="lastName"
              >
                Contact Number
              </label>
              <input
                onChange={handleChange}
                name="contactNumber"
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="number"
                maxLength={10}
                placeholder="Enter your contact number"
                id="lastName"
              ></input>
            </div>
            <div className="col-span-2 grid">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="email"
                >
                   Address
                </label>
                <input
                    onChange={handleChange}
                    name="address"
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Enter your Address"
                  id="email"
                ></input>
              </div>
              <div className=' flex items-center mt-3'>
                <div className=' flex items-center'>
                    <input onChange={handleChange} type="radio" value="esewa" name="paymentMethod" id="esewa" />
                    <label htmlFor="esewa">
                    <button>
                        <Image 
                        src="/esewa.jpg"
                        alt='esewa'
                        height={50}
                        width={200}
                        />
                    </button>
                    </label>
                </div>
                <div className=' flex items-center'>
                    <input type="radio" onChange={handleChange} value="khalti" name="paymentMethod" id="khalti" />
                    <label htmlFor="khalti">
                    <button>
                        <Image 
                        src="/khalti.png"
                        alt='khalti'
                        height={40}
                        width={150}
                        />
                    </button>
                    </label>
                </div>
                </div>

            </div>

            <div className="col-span-2 grid">
              <button
                onClick={handleNextStep}
                className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Next Step
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
