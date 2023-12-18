import SearchBar from '../components/SearchBar';
import herobanner from '../assets/images/rental-services.jpg'
import crane from '../assets/images/parts/crane.png'
import cat1 from '../assets/images/categories/cat1.jpg'
import cat2 from '../assets/images/categories/cat2.jpg'
import cat3 from '../assets/images/categories/cat3.jpg'
import cat4 from '../assets/images/categories/cat4.jpg'
import cat5 from '../assets/images/categories/cat5.jpg'
import cat6 from '../assets/images/categories/cat6.jpg'
import cat7 from '../assets/images/categories/cat7.jpg'
import cat8 from '../assets/images/categories/cat8.jpg'
import cat9 from '../assets/images/categories/cat9.jpg'
import cat10 from '../assets/images/categories/cat10.jpg'
import cat11 from '../assets/images/categories/cat11.jpg'
import cat12 from '../assets/images/categories/cat12.jpg'

function Home() {
  return (
    <>
      <section className='hero'>
        <div className='hero-content'>
          <h1>Your partner for safe, productive & sustainable machines.</h1>
          <img className='banner-image' src={herobanner} alt='hero'></img>
        </div>
        <SearchBar />
      </section>
      <section className='section-blank section-categories'>
        <h2>Categories</h2>
        <div className='categories-container'>
          <div className='category' style={{ backgroundImage: `url(${cat1})`, backgroundSize: 'cover' }}>
            <div className='category-overlay'>
              <h2>Earth moving</h2>
            </div>
          </div>
          <div className='category' style={{ backgroundImage: `url(${cat2})`, backgroundSize: 'cover' }}>
            <div className='category-overlay'>
              <h2>Lifting</h2>
            </div>
          </div>
          <div className='category' style={{ backgroundImage: `url(${cat3})`, backgroundSize: 'cover' }}>
            <div className='category-overlay'>
              <h2>Road machine</h2>
            </div>
          </div>
          <div className='category' style={{ backgroundImage: `url(${cat4})`, backgroundSize: 'cover' }}>
            <div className='category-overlay'>
              <h2>Argricultural vehicles</h2>
            </div>
          </div>
          <div className='category' style={{ backgroundImage: `url(${cat5})`, backgroundSize: 'cover' }}>
            <div className='category-overlay'>
              <h2>Trucks</h2>
            </div>
          </div>
          <div className='category' style={{ backgroundImage: `url(${cat6})`, backgroundSize: 'cover' }}>
            <div className='category-overlay'>
              <h2>Crushing</h2>
            </div>
          </div>
          <div className='category' style={{ backgroundImage: `url(${cat7})`, backgroundSize: 'cover' }}>
            <div className='category-overlay'>
              <h2>Platforms</h2>
            </div>
          </div>
          <div className='category' style={{ backgroundImage: `url(${cat8})`, backgroundSize: 'cover' }}>
            <div className='category-overlay'>
              <h2>Cranes</h2>
            </div>
          </div>
          <div className='category' style={{ backgroundImage: `url(${cat9})`, backgroundSize: 'cover' }}>
            <div className='category-overlay'>
              <h2>Compressors</h2>
            </div>
          </div>
          <div className='category' style={{ backgroundImage: `url(${cat10})`, backgroundSize: 'cover' }}>
            <div className='category-overlay'>
              <h2>Trailers</h2>
            </div>
          </div>
          <div className='category' style={{ backgroundImage: `url(${cat11})`, backgroundSize: 'cover' }}>
            <div className='category-overlay'>
              <h2>Various</h2>
            </div>
          </div>
          <div className='category' style={{ backgroundImage: `url(${cat12})`, backgroundSize: 'cover' }}>
            <div className='category-overlay'>
              <h2>Lawn Mowers</h2>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home;