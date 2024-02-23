import Image from 'next/image'
import { FaStar } from 'react-icons/fa'


const Testimonials = () => {
  return (
    <div className=' min-h-screen flex flex-col  items-center'>
        <span className='text-[14px] md:hidden mt-4 md:text-[20px] text-red font-[700] '>TESTIMONIALS</span>
        
        <div className=' flex flex-col md:flex-row '>
            <div className='w-full  md:w-1/2 flex  justify-center items-center'>
                <Image src="/Group 167.png" alt='chef' width={581} height={750} />
            </div>
            <div className=' w-full md:mt-12 md:w-1/2'>
                <span className='text-[14px] hidden md:flex md:text-[20px] text-red font-[700] '>TESTIMONIALS</span>
                <h1 className='text-[20px] md:text-[60px] font-[700]'>What Our Customers <br />Say About Us</h1>
                <span className='text-[16px] text-justify md:text-[26px] font-[500] mt-3'>
                “I had the pleasure of dining at Foodi last night, and I'm still raving about the experience! The attention to detail in presentation and service was impeccable”
                </span>

                <div className='mt-4 flex flex-col md:flex-row gap-4'>
                    <div className='flex'>
                        <Image src="/Mask group.png" alt='users' height={30} width={80} className=' h-[50px] w-[50px] md:h[200px] w-md:[200px]'/>
                        <Image src="/Mask group-1.png" alt='users' height={30} width={80} className=' -ml-6 h-[50px] w-[50px] md:h[200px] w-md:[200px]'/>
                        <Image src="/Mask group-2.png" alt='users' height={30} width={80} className=' -ml-6 h-[50px] w-[50px] md:h[200px] w-md:[200px]' />
                    </div>
                    <div>
                        <h1 className=' md:text-[26px] font-[600]'>Customer Feedback</h1>
                        <span className='text-[14px]  md:text-[20px] text-[#555555] font-[700] flex flex-row items-center'>
                            <FaStar  color="#FFE605"/>4.3 (18.4k reviews)
                        </span>
                    </div>
                </div>

            </div>
        </div>

    </div>
  )
}

export default Testimonials