"use client";
import { AuthContext } from "@/hooks/auth";
import { CartActions } from "@/store/cartSlice";
import { WhistListActions } from "@/store/whistListSlice";
import Image from "next/image";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaRegHeart, FaHeart, FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";

const DishesComponent = ({ item }) => {

  const url=process.env.API;
  const dispatch = useDispatch();
  const wist = WhistListActions;
  const {user}=useContext(AuthContext)


  const [isClicked, setIsClicked] = useState(false);
  const [itemQty, setItemQty] = useState(1);

  const plusClicked = () => {
    if (itemQty == 10) {
      toast.error("Qty cannot be greater than 10");
      setItemQty(10);
    } else {
      setItemQty(itemQty + 1);
    }
  };

  const subsClicked = () => {
    if (itemQty == 1) {
      toast.error("Qty must be less than One");
      setItemQty(1);
    } else {
      setItemQty(itemQty - 1);
    }
  };

  const removeFromWistList = () => {
    const data = {
      item: item
    };

    dispatch(wist.removeFromWishlist(data));
    setIsClicked(!isClicked);
    toast.success("Item removed from whistlist!");
  };

  const addToWistList = () => {
    const data = {
      item: item
    };
    // const data={
    //     imgOfItem:imgLink,
    //     nameOfItem:itemName,
    //     priceOfItem:itemPrice,
    //     ratingOfItem:itemRating,
    //     descOfItem:itemDesc,
    //     idOfItem:id
    // }
    dispatch(wist.addToWishlist(data));
    setIsClicked(!isClicked);
    toast.success("Item added to whistlist!");
  };

  const addToCart =async () => {
    console.log(item)
    const prod=[
      {
        product:item._id,
        quantity:itemQty,
      }
    ]
      let res=await fetch(`${url}/api/carts/user/createCart`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product:prod,
          user:user._id
        })
      })
      res=await res.json()
      toast.success(res.message)
  };


  return (
    <div className={`w-full mt-3 mb-4 md:mt-0 lg:w-[420px] h-[446px] bg-[#ffffff] rounded-lg rounded-tr-[37.5px] relative flex flex-col  ${item.stock == 0 ? "opacity-65 select-none cursor-none" :"opacity-100"} `}>
      <div className="w-[87px] h-[75px] bg-green rounded-tr-[37.5px] rounded-bl-[42.5px] flex items-center justify-center absolute right-0">
        {isClicked
          ? <FaHeart
              size={24}
              cursor="pointer"
              onClick={removeFromWistList}
              color="white"
            />
          : <FaRegHeart
              onClick={addToWistList}
              size={24}
              cursor="pointer"
              color="white"
            />}
      </div>
      <div className="flex flex-col items-center justify-center mt-[60px] ">
        <Image
          className=" cursor-pointer select-none hover:scale-105 duration-700 ease-in rounded-full"
          src={item.image}
          height={200}
          width={200}
          alt="foods"
        />
      </div>
      <div className=" px-10 select-none">
        <h1 className="text-[20px]  mt-1 md:text-[30px] font-[700]">
          {item.name}
        </h1>
        <span className="text-[14px] mt-1 md:text-[16px] text-[#555555] font-[700]">
          {item.description.slice(0,80)}
        </span>
        <div className="flex mt-1 justify-between items-center">
          <span className="text-[14px]  md:text-[20px] text-[#555555] font-[700]">
            <span className="text-red">Rs. </span>
            {item.totalPrice}
          </span>

        </div>
      </div>


            
      <div className=" px-2 md:px-10 flex items-center justify-between">
        <div>
          <button
            onClick={plusClicked}
            className="bg-green p-2 rounded-md w-10 text-white text-[18px]"
          >
            +
          </button>
          <input
            className=" w-16 md:w-20 h-10 bg-slate-100 p-3 rounded-lg border-none outline-none"
            type="number"
            value={itemQty}
            name="qty"
            id="qty"
            onChange={e => setItemQty(e.target.value)}
          />
          <button
            onClick={subsClicked}
            className="bg-red p-2 rounded-md w-10 text-white text-[18px]"
          >
            -
          </button>
        </div>
        <button
          onClick={addToCart}
          className="bg-green p-3 rounded-lg text-white font-[400]"
        >
          Add to Cart
        </button>
      </div>
      
    </div>
  );
};

export default DishesComponent;
