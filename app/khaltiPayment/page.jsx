"use client"
import { AuthContext } from "@/hooks/auth";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { Suspense, useContext, useEffect } from "react";

const KhaltiPaymentVerify = () => {
  const data = useContext(AuthContext);
  const router = useRouter(); 

  useEffect(() => {
    const token = Cookies.get('token');
    const url = process.env.API;

    const getUserDetails = async () => {
      try {
        if (token) {
          let res = await fetch(`${url}/api/users/getUser/${token}`);
          res = await res.json();
          data.setUserValues(res);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (token) {
      getUserDetails();
    }
  }, [data]);

  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null; 

  useEffect(() => {
    if (typeof window !== 'undefined' && searchParams) {
      const url = process.env.API;
      const status = searchParams.get('status');
      const idx = searchParams.get('idx');
      const token = searchParams.get('token');
      const bank_reference = searchParams.get('bank_reference');
      const amount = searchParams.get('amount');
      const transaction_id = searchParams.get('transaction_id');
      const tidx = searchParams.get('tidx');
      const pidx = searchParams.get('pidx');
      const purchase_order_id = searchParams.get('purchase_order_id');

      const verifyPayment = async () => {
        const data = {
          "pidx": pidx,
        };

        try {
          const res = await fetch(`${url}/api/payments/user/khaltiPay/verify-payment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user: data.user._id,
              status: status,
              idx: idx,
              token: token,
              bank_reference: bank_reference,
              amount: amount,
              transaction_id: transaction_id,
              tidx: tidx,
              pidx: data,
              orderId: purchase_order_id
            })
          });
          const responseData = await res.json();
          console.log(responseData);
        } catch (error) {
          console.error('Error verifying payment:', error);
        }
      };

      if (data.user && pidx && purchase_order_id) {
        verifyPayment();
      }
    }
  }, [data, searchParams]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-md text-center gap-5">
          <div className="flex items-center justify-center">
            <div className="bg-[#FF7643] p-3 h-24 w-24 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 text-white h-24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>
          </div>
          <h1 className="font-bold">Thank you for ordering</h1>
          <span className="mt-3 font-semibold">Your order id : #{purchase_order_id}</span>
          <div className="flex items-center w-full gap-3 mt-3">
            <Link href="/orders" className="p-3 bg-white border-black border-[1px] rounded-lg dark:text-white font-bold">
              VIEW ORDER
            </Link>
            <Link href="/" className="p-3 bg-[#FF7643] text-white font-bold rounded-lg">
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default KhaltiPaymentVerify;
