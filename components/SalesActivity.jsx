"use client"
import { useLayoutEffect, useState } from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  

const SalesActivity = () => {
    const url=process.env.API;
    const [result,setResult]=useState('')

    

    useLayoutEffect(() => {
      const fetchAPI=async()=>{
        let res= await fetch(`${url}/api/orders/admin/totalOrders/salesAllDay`);
        res= await res.json();
        setResult(res)
    }
        fetchAPI();
    }, [url]);

    

    const data = {
      labels: result?.ordersWithGrowth?.map((data) => data.month),
      datasets: [{
        label:"Total Sales",
        data:result?.ordersWithGrowth?.map((data) => data.sales),
        borderColor: "#cb0c9f",
        borderWidth: 3,
        pointBorderColor: "#cb0c9f",
        pointBorderWidth: 3,
        tension: 0.5,
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "#f797e1");
          gradient.addColorStop(1, "white");
          return gradient;
        },
      },
    ],
    };
    
    const config = {
      type: "line",
      data: data,
      plugins:{
        legend:false
      },
      options: {
        animations: {
          tension: {
            duration: 4000,
            easing: 'linear',
            from: 1,
            to: 0,
            loop: true
          }
        },
        scales: {
          y: { // defining min and max so hiding the dataset does not change scale range
            min: 0,
            max: 100,
            ticks:{
              stepSize:2,
              Callback:(value)=> value + "K"
            }
          },
          x:{
              grid:{
                display:false
            }
          }
        }
      }
    };
    

  return (
    <div>
      <h1 className=" text-[2rem] text-orange-600 font-bold mt-3 select-none cursor-pointer ">Sales Activity</h1>
      <Line 
      data={data} 
      options={config}

      />
    </div>
  );
};

export default SalesActivity;
