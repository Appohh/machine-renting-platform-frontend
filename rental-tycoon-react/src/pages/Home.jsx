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
import { Link } from 'react-router-dom';

const categories = [
  { id: 1, name: 'Earth moving', image: cat1 },
  { id: 2, name: 'Lifting', image: cat2 },
  { id: 3, name: 'Road machine', image: cat3 },
  { id: 4, name: 'Argricultural', image: cat4 },
  { id: 5, name: 'Trucks', image: cat5 },
  { id: 6, name: 'Crushing', image: cat6 },
  { id: 7, name: 'Platforms', image: cat7 },
  { id: 8, name: 'Cranes', image: cat8 },
  { id: 9, name: 'Compressors', image: cat9 },
  { id: 10, name: 'Trailers', image: cat10 },
  { id: 11, name: 'Various', image: cat11 },
  { id: 12, name: 'Lawn Mowers', image: cat12 },
]

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
          {categories.map(category => (
            <Link
              key={category.id}
              to={`/catalog?categoryId=${category.id}`}
              className='category-button'
            >
              <div
                className='category'
                style={{ backgroundImage: `url(${category.image})`, backgroundSize: 'cover' }}
              >
                <div className='category-overlay'>
                  <h2>{category.name}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

export default Home;