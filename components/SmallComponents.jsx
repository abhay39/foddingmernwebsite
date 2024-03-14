"use client"
import { useEffect, useLayoutEffect, useState } from "react"


const SmallComponents = ({item,totalVals, growthPercetage}) => {
    
    const url=process.env.API;
    const name=item?.name;
    const [result,setResult]=useState('')
    const [amount,setTotalAmount]=useState(0)

    const fetchAPI=async()=>{
        if(name=="Total Orders"){
            let res= await fetch(`${url}/api/orders/admin/totalOrders/salesByThisMonth`);
            res= await res.json();
            setResult(res)
        }else if(name=="Total Users"){
            let res= await fetch(`${url}/api/users/admin/totalUsers/userGrowth`);
            res= await res.json();
            setResult(res)

        }else if(name=="Total Carts"){
            
        }else if(name=="Total Sales"){
            let res= await fetch(`${url}/api/orders/admin/totalOrders/salesByThisMonth`);
            res= await res.json();
            setResult(res)
        }
    }

    useEffect(() => {
        fetchAPI();
    }, [name]);

    
    useEffect(()=>{
        let a=0;
        result?.sortedOrdersWithGrowth?.map(item=>{
            a+=item.total
        })
        setTotalAmount(a)
    },[result])




  return (
    <div key={item.id} className=' bg-white p-3 py-6 rounded-md w-full '>
        <div className=' flex items-center justify-between'>
            <div>
                <h1 className=' text-slate-500 text-sm'>{item?.name}</h1>
                {
                    item.name==="Total Sales" ? (<span className=' text-2xl font-bold'>&#8377;{amount}</span>) :(<span className=' text-2xl font-bold'>{result?.orderLength}</span>)
                }
            </div>
            <div className={`bg-orange-300 w-10 h-10 rounded-full p-2`}>
                {item?.icon}
                
            </div>
        </div>

            {
                result?.sortedOrdersWithGrowth && result.sortedOrdersWithGrowth.length > 0 && result.sortedOrdersWithGrowth[0]?.growthPercentage > 0 ? (<div className=' flex items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-green">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                </svg>
                <span className=' flex items-center text-sm'>
                {result?.sortedOrdersWithGrowth && result.sortedOrdersWithGrowth.length > 0 && result.sortedOrdersWithGrowth[0]?.growthPercentage}%
                    Up from yesturday
                </span>
            </div>) : (<div className=' flex items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 text-red h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
                </svg>
                
                <span className=' flex items-center text-sm'>
                    0%
                    down from yesturday
                </span>
            </div>
)
            }

            

            
    </div>
  )
}

export default SmallComponents