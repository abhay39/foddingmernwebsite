"use client"
import React, {useState } from "react";
import { useSelector } from "react-redux";
import anim from '../public/upload.json';

import Lottie from 'lottie-react';
import toast from "react-hot-toast";

const AddProduct = ({mode}) => {
  
  const [isLoading,setIsLoading]=useState(false)
  const user=useSelector(item=>item.UserReducer)
  const API=useSelector(item=>item.APIReducer)
  const [pdetails,setPDetails]=useState({
    name:'',
    price:'',
    description:'',
    image:'',
    category:'',
    stock:'',
    addedBy:user?.name
  })

  const handleInputChange=(e)=>{
    setPDetails({...pdetails,[e.target.name]:e.target.value})
  }

  const submit=async()=>{
      let res= await fetch(`${API}/api/products/addProduct`,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(pdetails)
      })
      const status=res.status;
      res= await res.json();
      if(status==200){
        toast.success(res.message);
        setPDetails({
          name:'',
          price:'',
          description:'',
          image:'',
          category:'',
          stock:'',
          addedBy:user?.name
        })
      }else{
        toast.error(res.message);
      }
  }

  const cloudinaryUpload = async(e) => {
      const file = e.target.files[0];
      setIsLoading(true);
      const data = new FormData()
      data.append('file', file)
      data.append('upload_preset', 'foodie')
      data.append("cloud_name", "dgml5sbu6")
      let response=await fetch("https://api.cloudinary.com/v1_1/dgml5sbu6/image/upload", {
        method: "POST",
        body: data
      })
      response=await response.json();
      setIsLoading(false)
      setPDetails({
        ...pdetails,
        image:response.secure_url
      })

  }



  return (
    <div className=" min-h-screen w-full">
      <p onClick={mode} className=" right-1 cursor-pointer text-red absolute font-bold"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
      </p>
      <h1 className=" text-[2.4rem] text-center font-bold">Add Products</h1>

      <div className=" bg-slate-300 rounded-md shadow-lg p-2 py-3 md:p-6 w-full">
        
          <div className=" w-full">
            <label htmlFor="">Name</label>
            <br />
            <input
              type="text"
              name="name"
              onChange={handleInputChange}
              value={pdetails.name}
              placeholder="Enter product name"
              className=" p-2  w-full  rounded-md "
            />
          </div>

          <div className=" w-full mt-3">
            <label htmlFor="">Description</label>
            <br />
            <input
            name="description"
            value={pdetails.description}
              type="text"
              onChange={handleInputChange}
              placeholder="Enter description here"
              className=" p-2 w-full  rounded-md "
            />
          </div>

          <div className=" w-full mt-3">
            <label htmlFor="">Price</label>
            <br />
            <input
            name="price"
            value={pdetails.price}
              type="number"
              onChange={handleInputChange}
              placeholder="Enter price of product"
              className=" p-2 w-full  rounded-md "
            />
          </div>

          <div className=" w-full mt-3">
            <label htmlFor="">Category</label>
            <br />
            <select onChange={handleInputChange}  id="" name="category" className=" p-2 w-full  rounded-md ">
                <option value="Sweets">Sweets</option>
                <option value="Nasta">Nasta</option>
                <option value="Food">Food</option>
                <option value="Pizza">Pizza</option>
                <option value="Desserts">Desserts</option>
                <option value="Soups">Soups</option>
                <option value="Drinks">Drinks</option>
            </select>
          </div>

          <div className=" w-full mt-3">
            <label htmlFor="">Quantity</label>
            <br />
            <input
            onChange={handleInputChange}
              name="stock"
              value={pdetails.stock}
              type="number"
              placeholder="Enter qty of product"
              className=" p-2 w-full  rounded-md "
            />
          </div>

          <div className=" w-full mt-3">
            <label htmlFor="">Added by</label>
            <br />
            <input
              onChange={handleInputChange}
              value={user?.name}
              type="text"
              placeholder="Enter name of owner"
              className=" p-2 w-full  rounded-md "
            />
          </div>

          <div className=" w-full mt-3">
            <label htmlFor="">Upload product photo</label>
            <br />
            <input
              
              onChange={cloudinaryUpload}
              type="file"
              name="images"
              accept="image/*"
              placeholder="Enter name of owner"
              className=" p-2 w-full  rounded-md "
            />
          </div>

          {
            
          }

          <div>
            
              {
                isLoading?
                <Lottie style={{height:80,width:'90%',}} animationData={anim} />
                :
                <button onClick={submit} className=" p-3 rounded-lg font-bold bg-green w-full mt-3 text-xl text-white">
                  Add Product
                </button>
              }
          </div>

          

           
          

      </div>
    </div>
  );
};

export default AddProduct;