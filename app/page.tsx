import React from 'react'
import Image from 'next/image'

const Home = () => {
  return (
    <>
    <section className='px-6 border-2 md:px-20 py-24'>
      <div className='flex max-xl:flex-col gap-16'>
        <div className='flex flex-col justify-center '>
          <p className='small-text'>
            Discover More, Spend Less
            <Image
              src="assets/icons/arrow-right.svg"
              alt='arrow-right'
              width={16}
              height={16}
            />
          </p>
          <h1 className='head-text'>
            Your Savings Journey Starts with <span className='text-primary'>Data</span>
          </h1>
          <p className='mt-6'>Our app harnesses the power of web scraping to provide you with real-time data on your favorite products. Discover price trends, track changes over time, and receive alerts when prices hit their lowest point – all at your fingertips.</p>
          Searchbar
        </div>
        HeroCarousel
      </div>
    </section>


    </>
  )
}

export default Home
