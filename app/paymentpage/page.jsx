
"use client"
import { checkout } from '@/components/checkout';
import { useSearchParams } from 'next/navigation'
import { useState } from 'react';


const page = () => {
  const search=useSearchParams();
  const [userDetails,setUserDetails] = useState({
      "address":search.get('address'),
      "totalPrice":search.get('totalPrice'),
      "totalQuantity":search.get('totalQuantity'),
      "fullname":search.get('fullname'),
      "email":search.get('email'),
  })

  console.log(userDetails);

  return (
    <div>
      
    </div>
  )
}

export default page