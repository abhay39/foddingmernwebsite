import Image from 'next/image'
import { MdSlowMotionVideo } from "react-icons/md";
import "./banner.css";

const Banner = () => {
  return (
    <div className=' flex min-h-screen overflow-hidden justify-center flex-col-reverse lg:flex-row items-center gap-5 mt-3'>

      <div className='w-full first sm:mt-16 md:w-1/2 text-center lg:text-justify'>
        <h1 className=' text-[30px] md:text-[62px]  w-full font-bold'>
          Dive into Delights Of Delectable
          <span className='text-green'> Food</span>
        </h1>
        <span className='text-[26px] mt-6 font-medium text-left text-gray-600'>Where Each plate weaves  a story of culinary  mastery and passionate craftsmanship</span>

        <div className='flex flex-wrap mt-6 gap-9 w-full justify-center items-center lg:justify-start '>
          <button className=' w-full md:w-[250px] h-[80px] bg-green p-4 rounded-3xl text-[18px] md:text-[26px] font-semibold text-white'>
            Order Now
          </button>

          <button className='  h-[80px] md:w-[250px] p-4 rounded-3xl text-[26px]  font-semibold  flex items-center justify-center w-full bg-gray-200 hover:bg-slate-200 gap-3 flex-row'>
            Watch Video<MdSlowMotionVideo />
          </button>
        </div>
      </div>

      <div className='w-full second md:w-1/2 flex justify-center h-[500px] items-center'>
        <Image src="/Banner.png" alt='banner' height={500} width={500} className='w-[780px]  md:h-[780x] object-cover'/>
      </div>
    </div>
  )
}

export default Banner