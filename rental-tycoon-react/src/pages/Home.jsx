import SearchBar from '../components/SearchBar';
import herobanner from '../assets/images/rental-services.jpg'

import TokenManager from '../services/TokenManager';
import { useNavigate } from 'react-router-dom';

function Home() {

  const navigate = useNavigate();
  const claims = TokenManager.getClaims();
  const isLoggedIn = TokenManager.getAccessToken();

  

  return (
    <>
      <section className='hero'>
        <div className='hero-content'>
          <h1>Your partner for safe, productive & sustainable machines.</h1>
          <img src={herobanner} alt='hero'></img>
        </div>
        <SearchBar />
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

export default Home;