"use client";
import SignUpPage from "@/app/register/page";
import Image from "next/image";
import { useLayoutEffect, useState } from "react";


const TotalUsers = () => {
  const url=process.env.API;

  const [getTotalUsers, setGetTotalUsers] = useState([]);
  const [openMode, setOpenMode] = useState(false);
  const [nameToBeSearched, setNameToBeSearched] = useState('')
  const [searched,setSearched]=useState([]);

  
  useLayoutEffect(() => {
    const fetchAPI = async () => {
      let res = await fetch(`${url}/api/users/admin/totalUsers`);
      res = await res.json();
  
      setGetTotalUsers(res);
    };
    fetchAPI();
  }, [openMode,url]);

  const changeMode=()=>{
    setOpenMode(!openMode)
  }

  const handleChange=()=>{
    const filteredUsers=getTotalUsers.filter(user=>user.name.toLowerCase().includes(nameToBeSearched.toLowerCase()))
    setSearched(filteredUsers)
    // console.log(filteredUsers)
  }


  return (
    <div div className=" min-h-screen">
      <section className=" min-h-screen w-full  px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-3xl font-semibold">Total Users</h2>
            <p className="mt-1 text-sm text-gray-700">
              This is a list of all Users. You can add new products, edit or delete existing
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
              Add new user
            </button>
          </div>
        </div>

        <div className="flex w-full mt-2 items-center space-x-2 md:w-1/3">
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Name of person"
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

        {
          searched?.length > 0 ? (
            <>

<div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr className="divide-x divide-gray-200">
                      <th
                        scope="col"
                        className="px-4 sm:w-1/3 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        <span>Users</span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 w-[50px] py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        Role
                      </th>

                      

                      <th scope="col" className=" sm:w-1/3  px-4 py-3.5">
                        <span className="sr-only">Action</span>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 bg-white">
                    {getTotalUsers.map((person) => (
                      <tr key={person.name} className="divide-x divide-gray-200">
                        <td className="whitespace-nowrap px-4  py-4">
                          <div className="flex items-center md:w-[200px]">
                            <div className="h-10  hidden md:block w-10 flex-shrink-0">
                              <Image
                                className="h-10 w-10   rounded-full object-cover"
                                src={person.profilePicture}
                                alt=""
                                width={40}
                                height={40}
                              />
                            </div>
                            <div className=" ml-0 md:ml-4 ">
                              <div className="text-sm font-medium  text-gray-900">{person?.name.slice(0,10)}</div>
                              <div className="text-sm font-medium hidden md:block text-gray-900">{person?.email}</div>
                              
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-12 py-4">
                          <div className="text-sm text-gray-900">{person.role}</div>
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
        

            </>
          ) :(null)
        }

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
                        <span>Users</span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        Role
                      </th>

                      

                      <th scope="col" className=" action px-4 py-3.5">
                        <span className="sr-only">Action</span>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 bg-white">
                    {getTotalUsers.map((person) => (
                      <tr key={person.name} className="divide-x divide-gray-200">
                        <td className="whitespace-nowrap px-4  py-4">
                          <div className="flex items-center md:w-[200px]">
                            <div className="h-10  hidden md:block w-10 flex-shrink-0">
                              <Image
                                className="h-10 w-10   rounded-full object-cover"
                                src={person.profilePicture}
                                alt=""
                                width={40}
                                height={40}
                              />
                            </div>
                            <div className="ml-4 ">
                              <div className="text-sm font-medium text-gray-900">{person?.name}</div>
                              <div className="text-sm font-medium hidden md:block text-gray-900">{person?.email}</div>
                              
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-12 py-4">
                          <div className="text-sm text-gray-900">{person.role}</div>
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

export default TotalUsers;
