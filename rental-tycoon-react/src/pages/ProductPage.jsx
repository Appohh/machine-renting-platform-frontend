import { useState, useEffect } from "react";
import './ProductPage.css';
import ProductService from "../services/ProductService";
import { useLocation, useParams } from 'react-router-dom';
import { useCart } from '../components/Cart/CartContext';
import AddToCartPopUp from "../components/Cart/AddToCartPopUp";


function ProductPage() {
  const location = useLocation();
  let { productId } = useParams();
  const [foundProduct, setFoundProduct] = useState(null);
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (productId !== undefined) {
      ProductService.getProductById(productId)
        .then((response) => {
          if (response) {
            setFoundProduct(response);
            console.log("response: ", response)
          } else {
            console.error('Product not found');
          }
        })
        .catch((error) => {
          console.error('Error fetching product:', error);
        });
    }
  }, [productId]);


  const handleAddToCart = () => {
    setSelectedProduct(foundProduct); 
  };


  if (foundProduct !== null) {
    return (
      <div className="detailPage-profile-user">
        <div className="detailPage-post-content">
        {foundProduct.files[0] && foundProduct.files[0].type.startsWith("image/") && (
          <img
            src={foundProduct.files[0].url}
            alt={`Product File`}
          />
        )}

        {foundProduct.files[0] && foundProduct.files[0].type.startsWith("video/") && (
          <video
            src={foundProduct.files[0].url}
            controls
          />
        )}
        </div>
        <div className="detailPage-post-content">
          <div className="detailPage-product-name">{foundProduct.name}</div>
          <div className="detailPage-product-price">€{foundProduct.price},-</div>
          <div className="detailPage-product-description">{foundProduct.description}</div>
          <button onClick={() => handleAddToCart()} className='rent-button'>Add to Cart</button>
        </div>
  
        {selectedProduct && (
          <AddToCartPopUp
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    );
  }
  
}

export default ProductPage;