"use client";
import Image from "next/image";
import { useLayoutEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";

const TotalUsers = () => {
  const api = useSelector(item => item.APIReducer);

  const [getTotalUsers, setGetTotalUsers] = useState([]);

  const fetchAPI = async () => {
    let res = await fetch(`${api}/api/users/totalUsers`);
    res = await res.json();

    setGetTotalUsers(res);
  };

  useLayoutEffect(() => {
    fetchAPI();
  }, []);

  return (
    <div>
      <div className=" bg-[#90BD95] p-4 rounded-md">
        <h1 className="text-[25px] text-center md:text-[50px] font-[700] text-white">
          List of Users
        </h1>
      </div>

      <div className=" flex py-3 px-3 items-center w-full justify-between">
        <p className=" font-bold md:text-[1.5rem] text-black mt-4">
          Total Users: {getTotalUsers.length}
        </p>
      </div>

      <div className=" bg-[#90BD95] text-white h-[72px] flex px-4 rounded-lg items-center w-full font-bold">
        <span className=" w-1/5 hidden md:block md:w-1/5 text-center">
          USER IMAGE
        </span>
        <span className=" w-1/4 md:w-1/5 text-center ">USER NAME</span>
        <span className=" w-1/4 md:w-1/5 text-center">USER EMAIL</span>
        <span className=" w-1/4 md:w-1/5 text-center">ROLE</span>
        <span className=" w-1/4 md:w-1/5 text-center">ACTIONS</span>
      </div>

      <div>
        {getTotalUsers.length > 0
          ? getTotalUsers.map(item => {
              return (
                <div key={item._id}>
                  <div className="   flex px-4 rounded-lg items-center w-full mt-4 mb-2">
                    <div className=" w-1/5 md:w-1/5  items-center justify-center hidden md:flex">
                      <Image
                        alt="item"
                        src={ item.profilePicture || "/Egg salad.png"}
                        width={50}
                        height={50}
                      />
                    </div>
                    <span className="w-1/4 md:w-1/5  text-center">
                      {item.name}
                    </span>
                    <span className=" w-1/4 md:w-1/5 text-center">
                      {item.email}
                    </span>
                    <span className="w-1/4 md:w-1/5 text-center">
                      {item.role.toUpperCase()}
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
          : <h1>No Users in this website yet</h1>}
      </div>
    </div>
  );
};

export default TotalUsers;
