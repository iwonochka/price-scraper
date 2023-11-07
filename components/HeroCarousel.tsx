"use client"
import React from 'react'
import Image from 'next/image';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
const heroImages = [
  {url: '/assets/images/hero-1.svg', alt: 'smartwatch'},
  {url: '/assets/images/hero-2.svg', alt: 'phone'},
  {url: '/assets/images/hero-3.svg', alt: 'perfume'},
  {url: '/assets/images/hero-4.svg', alt: 'chair'},
  {url: '/assets/images/hero-5.svg', alt: 'book'}
]
const HeroCarousel = () => {
  return (
    <div className='hero-carousel'>
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={2000}
        showArrows={false}
        showStatus={false}
      >
        {heroImages.map((image) => (
          <Image
            src={image.url}
            alt={image.alt}
            width={484}
            height={484}
            className='object-contain'
            key={image.alt}
          />
        ))}
      </Carousel>
      <Image
        src="/assets/icons/hand-drawn-arrow.png"
        alt='arrow'
        width={175}
        height={175}
        className='max-xl:hidden absolute -left-[15%] bottom-[2rem] z-0'
      />
    </div>
  )
}

export default HeroCarousel
