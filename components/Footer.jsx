import { Contact, MainMenu, usefulLinks } from '@/assets/Navlinks'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='grid bg-slate-100 p-6 md:flex-row justify-around grid-cols-2 md:grid-cols-4'>
      <div className='w-full '>
        <Image src="/logo.png" alt='logo' height={50} width={100} />
        <span className='text-xs md:text-sm'>Savor the artistry where every dish  <br />is a culinary masterpiec</span>
      </div>

      <div className='w-full '>
        <h1 className='font-bold text-base'>
          Useful links
        </h1>
        {
          usefulLinks.map((item,index)=>{
            return(
              <div key={index}>
                <Link className=' opacity-55' href={item.link}>{item.name}</Link>
                <br />
              </div>
            )
          })
        }
      </div>


      <div className='w-full'>
        <h1 className='font-bold text-base'>
          Main Menu
        </h1>
        {
          MainMenu.map((item,index)=>{
            return(
              <div key={index}>
                <Link className=' opacity-55' href={item.link}>{item.name}</Link>
                <br />
              </div>
            )
          })
        }
      </div>


      <div className='w-full '>
        <h1 className='font-bold text-base'>
          Contact
        </h1>
        {
          Contact.map((item,index)=>{
            return(
              <div key={index}>
                <span>{item.name}</span>
                <span>{item.number}</span>
                <span>{item.socials}</span>
              </div>
            )
          })
        }
      </div>


    </div>
  )
}

export default Footer