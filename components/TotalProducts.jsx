"use client";
import { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddProduct from "./AddProduct";
import Image from "next/image";
import toast from "react-hot-toast";

const TotalProducts = () => {
  const url=process.env.API;

  const [getTotalProduct, setGetTotalProduct] = useState([]);
  const [openMode, setOpenMode] = useState(false);

  
  useLayoutEffect(() => {
    const fetchAPI = async () => {
      let res = await fetch(`${url}/api/products/listofproducts`);
      res = await res.json();
      setGetTotalProduct(res);
    };
    fetchAPI();
  }, [getTotalProduct,url]);

  const changeMode=()=>{
    setOpenMode(!openMode)
  }

  const deleteItem=async(item)=>{
    console.log(item)
    let res= await fetch(`${api}/api/products/deleteProduct/${item}`,{
      method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
    });
    res = await res.json();
    toast.success(res.message);
  }

  return (
    <div div className=" min-h-screen">
      <section className=" min-h-screen w-full  px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-3xl font-semibold">Total Products</h2>
            <p className="mt-1 text-sm text-gray-700">
              This is a list of all products. You can add new products, edit or delete existing
              ones.
            </p>
          </div>
          <div>
            <button
              onClick={()=>{
                setOpenMode(!openMode)
              }}
              className="rounded-md bg-black px-3 mt-3 md: py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Add new product
            </button>
          </div>
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
                        <span>Product</span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        Price
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        Category
                      </th>

                      <th scope="col" className=" action px-4 py-3.5">
                        <span className="sr-only">Action</span>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 bg-white">
                    {getTotalProduct.map((person) => (
                      <tr key={person.name} className="divide-x divide-gray-200">
                        <td className="whitespace-nowrap px-4  py-4">
                          <div className="flex items-center md:w-[200px]">
                            <div className="h-10  hidden md:block w-10 flex-shrink-0">
                              <Image
                                className="h-10 w-10   rounded-full object-cover"
                                src={person.image}
                                alt=""
                                width={40}
                                height={40}
                              />
                            </div>
                            <div className="ml-4 ">
                              <div className="text-sm font-medium text-gray-900">{person?.name}</div>
                              <div className="text-sm hidden md:block text-gray-500 md:w-[150px]">{person?.description.slice(0,43)}</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-12 py-4">
                          <div className="text-sm text-gray-900">Rs. {person.totalPrice}</div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                            {person.category}
                          </span>
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
        <AddProduct  mode={changeMode}/>
      </div>
    )}
    </div>
  );
};

export default TotalProducts;
