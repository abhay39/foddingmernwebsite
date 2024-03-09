"use client";
import SignUpPage from "@/app/register/page";
import Image from "next/image";
import { useLayoutEffect, useState } from "react";

import { useSelector } from "react-redux";

const TotalOrders = () => {
  const url=process.env.API;

  const [getTotalOrder, setGetTotalOrder] = useState([]);
  const [openMode, setOpenMode] = useState(false);
  const [nameToBeSearched, setNameToBeSearched] = useState('')
  const [searched,setSearched]=useState([]);

  const fetchAPI = async () => {
    let res = await fetch(`${url}/api/orders/admin/totalOrders`);
    res = await res.json();

    setGetTotalOrder(res);
  };

  useLayoutEffect(() => {
    fetchAPI();
  }, []);

  const changeMode=()=>{
    setOpenMode(!openMode)
  }

  const handleChange=()=>{
    const filteredUsers=getTotalOrder.filter(user=>user.name.toLowerCase().includes(nameToBeSearched.toLowerCase()))
    setSearched(filteredUsers)
    // console.log(filteredUsers)
  }


  return (
    <div div className=" min-h-screen w-full">
      <section className=" min-h-screen w-full  px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-3xl font-semibold">Total Orders </h2>
            <p className="mt-1 text-sm text-gray-700">
              This is a list of all Orders. You can add new orders, edit or delete existing
              ones.
            </p>
          </div>

         
        </div>

        <div className="flex w-full mt-2 items-center space-x-2 md:w-1/3">
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Order Id"
            onChange={(e)=>{
              setNameToBeSearched(e.target.value);
              handleChange()
            }}
          ></input>
          <button
            onClick={handleChange}
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Search
          </button>
        </div>

       

        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr className="divide-x divide-gray-200">
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        <span>Order By</span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        Payment Method
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        Amount
                      </th>

                      <th scope="col" className="  px-4 py-3.5">
                        <span className="sr-only">Action</span>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 bg-white">
                    {getTotalOrder.map((item) => (
                      <tr key={item._id} className="divide-x divide-gray-200">
                        <td className="whitespace-nowrap px-4  py-4">
                          <div className="flex items-center md:w-[200px]">
                            
                            <div className="ml-4 ">
                              <div className="text-sm font-medium text-gray-900">{item?.user}</div>                              
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-12 py-4">
                          <div className="text-sm text-gray-900">{item.paymentMethod}</div>
                        </td>
                        <td className="whitespace-nowrap px-12 py-4">
                          <div className="text-sm text-gray-900">{item.status}</div>
                        </td>
                        <td className="whitespace-nowrap px-12 py-4">
                          <div className="text-sm text-gray-900">&#8377;{item.amount}</div>
                        </td>
                        
                        
                        <td className="whitespace-nowrap px-4 py-4 text-right text-sm gap-4 font-medium">
                          <button  className=" text-indigo-600">
                            Edit
                          </button>
                          <br />
                          <button onClick={()=>{
                            deleteItem(person._id)
                          }} className=" text-red ml-3">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 w-full border-gray-300">
          <div className="mt-2 flex items-center justify-end">
            <div className="space-x-2">
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                &larr; Previous
              </button>
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Next &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>
    {openMode && (
      <div className="top-0 z-50 min-h-screen absolute w-full  left-0 flex items-center justify-center bg-slate-200 p-6">
        <SignUpPage  mode={changeMode}/>
      </div>
    )}
    </div>
  );
};

export default TotalOrders;
