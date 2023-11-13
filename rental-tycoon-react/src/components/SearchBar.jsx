import { useNavigate } from 'react-router-dom';
import productService from "../services/ProductService";
import { useState } from "react";

function SearchBar() {
  const [searchResults, setSearchResults] = useState([]);
  const [SearchProduct, setSearchProductId] = useState("");
  const navigate = useNavigate();

  const fetchUserProducts = () => {
    productService.getProducts(SearchProduct)
      .then((response) => {
        if (response) {
            setSearchResults(response);
          } else {
            setSearchResults([]);
          }
      })
      .catch((error) => {
        setSearchResults([]);
      });
  };

  return (
    <>
      <form className="search-container">
        <input className='search-bar'
          type="text"
          placeholder="Search for products..."
          value={SearchProduct}
          onChange={(e) => {
            setSearchProductId(e.target.value);
            fetchUserProducts();
          }}
        />
      </form>
      <div className="search-results">
          {searchResults.map((products) => (
            <div
              key={products.id}
              onClick={() => navigate(`/ProductPage/${products.id}`, { state: { products } })}
            >
              {products.name}
            </div>
          ))}
        </div>
    </>
  );
}

export default SearchBar;