import { useState } from 'react'
import herobanner from '../assets/images/rental-services.jpg'


function Home() {

  return (
    <>
      <section className='hero'>
        <div className='hero-content'>
          <h1>Your partner for safe, productive & sustainable machines.</h1>
          <img src={herobanner} alt='hero'></img>
        </div>

        <form className='search-container'>
          <input className='search-bar' placeholder='Search for machines...' type="text" />
        </form>
      </section>
      <section className='section-blank section-categories'>
        <h2>Categories</h2>
        <div className='categories-container'>
          <div className='category'></div>
          <div className='category'></div>
          <div className='category'></div>
          <div className='category'></div>
          <div className='category'></div>
          <div className='category'></div>
          <div className='category'></div>
          <div className='category'></div>
        </div>
      </section>
    </>
  )
}

export default Home
