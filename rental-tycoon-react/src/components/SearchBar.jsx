import { useNavigate } from 'react-router-dom';
import productService from "../services/ProductService";
import { useState } from "react";
import crane from '../assets/images/parts/crane.png'

function SearchBar() {
  const [searchResults, setSearchResults] = useState([]);
  const [SearchProduct, setSearchProductId] = useState("");
  const navigate = useNavigate();

  const fetchUserProducts = () => {
    if (SearchProduct.length >= 1) {
      productService.getProductsByName(SearchProduct)
        .then((response) => {
          if (response) {
            setSearchResults(response);
          }
        })
        .catch((error) => {
          setSearchResults([]);
        });
    }
    else {
      setSearchResults([]);
    }
  };


  return (
    <>
      <form className="search-container">
        <img id='crane-home' src={crane} alt='crane'></img>
        <input className='search-bar'
          type="text"
          placeholder="Search for products..."
          value={SearchProduct}
          onChange={(e) => {
            setSearchProductId(e.target.value);
            fetchUserProducts();
          }}
        />
        {SearchProduct.length > 0 && (
          <div className="search-results">
            {searchResults.map((products) => (
              <div
                key={products.id}
                onClick={() => navigate(`/ProductPage/${products.id}`)} >
                {products.name}
              </div>
            ))}
          </div>
        )}
      </form>
    </>
  );
}

export default SearchBar;