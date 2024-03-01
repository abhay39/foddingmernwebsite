"use client"
import CartComponent from '@/components/CartComponent';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Page = () => {
  const cart = useSelector((item) => item.CartReducer);
  const [getCartLength, setGetCartLength] = useState([]);
const [totalPrice, setTotalPrice] = useState(0);
const [discount, setDiscountPrice] = useState(0);
const [deliveryPrice, setDeliveryPrice] = useState(0);
const [finalPrice, setFinalPrice] = useState(0);

useEffect(() => {
  const getLengths = localStorage.getItem('carts');
  setGetCartLength(JSON.parse(getLengths));
}, []);

useEffect(() => {
  // Calculate total price using reduce
  const totalPriceCalculation = getCartLength?.reduce(
    (acc, item) => acc + item.priceOfItem * item.qtyOfItem,
    0
  );
  setTotalPrice(totalPriceCalculation || 0);

  // Calculate discount based on total price
  const discountAmount = (5 / 100) * totalPrice;
  setDiscountPrice(discountAmount || 0);
}, [getCartLength, totalPrice]);

useEffect(() => {
  // Calculate delivery price based on discount
  const deliveryAmount = (4 / 100) * (totalPrice - discount);
  setDeliveryPrice(deliveryAmount.toFixed(2) || 0);
}, [discount]);

useEffect(() => {
  // Calculate final price based on discount and deliveryPrice
  setFinalPrice(totalPrice - discount - deliveryPrice || 0);
}, [discount, deliveryPrice]);

  return (
    <div className='min-h-screen'>
      <h1 className='text-3xl text-center font-bold mt-4'>Your Cart</h1>
      <br />
      <br />
      <div>
        <div className='flex items-center'>
          <p className='font-bold w-3/4'>Item</p>
          <p className='font-bold w-1/4'>Price</p>
          <p className='font-bold w-1/4'>Qty</p>
          <p className='font-bold w-1/4'>Total</p>
        </div>
        <hr className='border-gray-300 border-[1px]' />

        {getCartLength?.length > 0 ? (
          getCartLength?.map((item, index) => (
            <CartComponent key={index} item={item} />
          ))
        ) : (
          <div className='flex h-max items-center justify-center flex-col'>
            <h1>No items in cart</h1>
          </div>
        )}
      </div>

      <div className=' flex bg-slate-600 rounded-md  items-end flex-col justify-end  p-6 text-white'>
        <div className=' items-end justify-end flex flex-col'>
            <h1 className=' flex text-[1.2rem]'>Total Price: Rs. <p className=' text-red font-bold'>{totalPrice}</p></h1>
            <h1 className=' flex text-[1.4rem]'>Discount: Rs. <p className=' text-red font-bold'>{discount}</p></h1>
            <h1 className=' flex text-[1.4rem]'>Delivery: Rs. <p className=' text-red font-bold'>{deliveryPrice}</p></h1>
            <h1 className=' flex text-[1.4rem]'>Final Price: Rs. <p className=' text-red font-bold'>{finalPrice}</p></h1>
        </div>
        <button className=' bg-green text-white text-2xl p-4 rounded-lg font-bold mt-3'>Place Order</button>
      </div>


    </div>
  );
};

export default Page;
