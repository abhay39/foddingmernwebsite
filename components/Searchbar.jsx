"use client";
import { menuDishesAll } from "@/assets/listOfDishes";
import React, { useState } from "react";
import DishesComponent from "./DishesComponent";

const Searchbar = () => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState([]);

  const onChangeOfText = e => {
    let res = menuDishesAll.filter(item => item.name.toLowerCase().includes(value.toLowerCase()))
    setResult(res);
    console.log(res);
  };

  const handleErase=()=>{
    setValue("")
    setResult([])
  }

  return (
    <div className=" flex min-h-screen items-center justify-center p-1 md:p-3">
      <div className=" py-3 md:p-6 w-full bg-slate-300 rounded-lg shadow-2xl ">
        <h1 className=" text-center text-[1.6rem]  md:text-[2.2rem] font-bold">
          Search
        </h1>
        <div className="  md:p-6   w-full   flex items-center justify-center">
          <div className=" flex items-center bg-white rounded-lg px-2">
            <input
                onChange={e => {
                  setValue(e.target.value);
                  onChangeOfText();
                }}
                value={value}
                type="text"
                placeholder="enter a item name"
                className=" p-3 w-full rounded-md border-none outline-none"
              /> 
              <p className=" hover:text-red select-none cursor-pointer" onClick={handleErase}>X</p>
          </div>
        </div>
        <div className=" w-full grid grid-cols-1 lg:grid-cols-3 items-center">
          {result.length > 0 &&
            result.map((item, index) => {
              return (
                <div key={index} className="p-6 ">
                    <DishesComponent item={item}/>
                </div>
              );
            })}
          </div>
      </div>
    </div>
  );
};

export default Searchbar;
