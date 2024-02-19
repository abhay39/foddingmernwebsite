import Image from 'next/image'
import { MdSlowMotionVideo } from "react-icons/md";

const Banner = () => {
  return (
    <div className=' flex min-h-screen justify-center   flex-col md:flex-row items-center gap-5 mt-3'>

      <div className='w-full md:w-1/2 text-center md:text-justify'>
        <h1 className=' text-3xl md:text-[62px]  font-bold'>
          Dive into Delights
        </h1>
        <br />
        <h1 className=' text-3xl md:text-[62px]  font-bold mb-4'>
          Of Delectable
          <span className='text-green'> Food</span>
        </h1>
        <span className='text-[26px] mt-6 font-medium text-justify text-gray-600'>Where Each plate weaves  a story of culinary <br /> mastery and passionate craftsmanship</span>

        <div className='flex mt-6 gap-9 w-full justify-center items-center md:justify-start '>
          <button className=' w-[250px] h-[80px] bg-green p-4 rounded-3xl text-[26px] font-semibold text-white'>
            Order Now
          </button>

          <button className='  h-[80px] p-4 rounded-3xl text-[26px]  font-semibold  flex items-center hover:bg-slate-200 gap-3 flex-row'>
            Watch Video<MdSlowMotionVideo />
          </button>
        </div>
      </div>

      <div className='w-full md:w-1/2 flex justify-center h-[500px] items-center'>
        <Image src="/Banner.png" alt='banner' height={500} width={500} className='w-[780px]  md:h-[780x] object-cover'/>
      </div>
    </div>
  )
}

export default Banner