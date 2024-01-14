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
           <div className="image-container">
           <img
             src={foundProduct.files[0].url}
             alt={`Product File`}
           />
         </div>
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
          <div className="detailPage-product-price">€{foundProduct.price}/day</div>
          <div className="detailPage-product-description">{foundProduct.description}</div>
          
          <button onClick={() => handleAddToCart()} className='detailPage-rent-button'>Add to Cart</button>
          <div className="detailPage-product-rules">
              <p>
                <strong>-Rental Period:</strong> Your rental begins at pickup/delivery and ends at the agreed return time. Late returns may incur additional charges. <br />
                <strong>-Equipment Usage:</strong> Only trained and authorized individuals should operate the equipment. Use the equipment as intended, following safety regulations. <br />
                <strong>-Care and Maintenance:</strong> Regular maintenance checks during the rental period are your responsibility. Report any issues promptly for quick resolution. <br />
                <strong>-Cleaning and Return:</strong> Return the equipment in the condition you received it. Cleaning fees apply for excessively dirty returns. <br />
                <strong>-Loss or Damage:</strong> You are responsible for any loss, theft, or damage during the rental period. Report incidents immediately.
              </p>
            </div>
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