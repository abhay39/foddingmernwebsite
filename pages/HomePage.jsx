import Banner from '@/components/Banner'
import PopularCategories from '@/components/PopularCategories'
import Services from '@/components/Services'
import SpecialDishes from '@/components/SpecialDishes'
import Testimonials from '@/components/Testimonials'
import React from 'react'

const HomePage = () => {
  return (
    <div>
      <Banner />
      <PopularCategories />
      <SpecialDishes />
      <Testimonials />
      <Services />
    </div>
  )
}

export default HomePage