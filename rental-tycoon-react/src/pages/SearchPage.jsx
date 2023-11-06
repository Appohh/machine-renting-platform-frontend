import { useState } from "react";
import productService from "../services/ProductService";
import Products from "../components/Products";

function SearchPage() {
  const [foundProducts, setfoundProducts] = useState([]);
  const [SearchProduct, setSearchProductId] = useState("");

  const fetchUserPosts = () => {
    productService.getProducts(SearchProduct)
      .then((response) => {
        if (response) {
            setfoundProducts(response);
          } else {
            setfoundProducts([]);
          }
      })
      .catch((error) => {
        console.error('Error fetching user posts:', error);
      });
  };

  const handleSearch = () => {
    fetchUserPosts();
  };

  return (
    <div>
      <h2>Search for product</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={SearchProduct}
          onChange={(e) => setSearchProductId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="product-list">
            {foundProducts.length > 0 ? (
                foundProducts.map((product) => (
                <Products key={product.id} product={product} />
                ))
            ) : (
                <p>No products found.</p>
            )}
        </div>
    </div>
  );
}

export default SearchPage;