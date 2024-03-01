"use client";
import Image from "next/image";
import { useLayoutEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";
import AddProduct from "./AddProduct";

const TotalProducts = () => {
  const api = useSelector(item => item.APIReducer);

  const [getTotalProduct, setGetTotalProduct] = useState([]);
  const [openMode, setOpenMode] = useState(false);

  const fetchAPI = async () => {
    let res = await fetch(`${api}/api/products/listofproducts`);
    res = await res.json();
    setGetTotalProduct(res);
  };

  useLayoutEffect(() => {
    fetchAPI();
  }, []);

  const changeMode=()=>{
    setOpenMode(!openMode)
  }

  return (
    <>
    <div>
      <div className=" bg-[#90BD95] p-4 rounded-md">
        <h1 className="text-[25px] text-center md:text-[50px] font-[700] text-white">
          List of Product
        </h1>
      </div>

      <div className=" flex py-3 px-3 items-center w-full justify-between">
        <p className=" font-bold md:text-[1.5rem] text-black mt-4">
          Total Products: {getTotalProduct.length}
        </p>
        <button
          onClick={changeMode}
          className="bg-green text-center p-2 rounded-md text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </button>
      </div>

      <div className=" bg-[#90BD95] text-white h-[72px] flex px-4 rounded-lg items-center w-full font-bold">
        <span className=" w-1/5 hidden md:block md:w-1/5 text-center">
          P. IMAGE
        </span>
        <span className=" w-1/4 md:w-1/5 text-center ">P. NAME</span>
        <span className=" w-1/4 md:w-1/5 text-center">P. PRICE</span>
        <span className=" w-1/4 md:w-1/5 text-center">P. CAT</span>
        <span className=" w-1/4 md:w-1/5 text-center">P. QTY</span>
        <span className=" w-1/4 md:w-1/5 text-center">P. ADDEDBY</span>
        <span className=" w-1/4 md:w-1/5 text-center">ACTIONS</span>
      </div>

      <div>
        {getTotalProduct.length > 0
          ? getTotalProduct.map(item => {
              return (
                <div key={item._id}>
                  <div className="   flex px-4 rounded-lg items-center w-full mt-4 mb-2">
                    <div className=" w-1/5 md:w-1/5  items-center justify-center hidden md:flex">
                      <Image
                        alt="item"
                        src={item.image || "/Egg salad.png"}
                        width={80}
                        height={80}
                        className=" rounded-full object-cover"
                      />
                    </div>
                    <span className="w-1/4 md:w-1/5  text-center">
                      {item.name}
                    </span>
                    <span className=" w-1/4 md:w-1/5 text-center">
                      {item.price}
                    </span>
                    <span className=" w-1/4 md:w-1/5 text-center">
                      {item.category}
                    </span>
                    <span className="w-1/4 md:w-1/5 text-center">
                      {item.stock}
                    </span>
                    <span className="w-1/4 md:w-1/5 text-center">
                      {item.addedBy}
                    </span>
                    <div className=" flex items-center justify-center  w-1/4 md:w-1/5">
                      <button className="bg-[#D80B0B] text-center p-2 rounded-md text-white">
                        <MdDeleteForever />
                      </button>
                    </div>
                  </div>
                  <hr className=" border-[1px] border-slate-200" />
                </div>
              );
            })
          : <h1>No product in this website yet</h1>}
      </div>

    </div>
    {openMode && (
      <div className="top-0 z-50 min-h-screen fixed w-full  left-0 flex items-center justify-center bg-slate-200 p-6">
        <AddProduct  mode={changeMode}/>
      </div>
    )}
    </>
  );
};

export default TotalProducts;
