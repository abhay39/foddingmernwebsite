"use client"
import { adminNavs } from '@/assets/adminNav';


const page = ({params}) => {
 
  const selectedNav=params.nav

  
  
  return (
    <div className=' min-h-screen'>
      {
        adminNavs.map((item,index)=>{
          if(item.nav===selectedNav){
            return(
              <div className=' min-h-screen' key={index}>
                {item.page}
              </div>
            )
          }
        })
      }
    </div>
  )
}

export default page