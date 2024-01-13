import { useState, useEffect } from "react";
import './ProductPage.css';
import ProductService from "../services/ProductService";
import { useLocation,useParams } from 'react-router-dom';
import { useCart } from '../components/Cart/CartContext'; 

 
function ProductPage() {
  const location = useLocation();
  const products = location.state.products;
  const product = location.state.product;
  let { id } = useParams();
  const [foundProduct, setFoundProduct] = useState([]);
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    ProductService.getProductById(id)
      .then((response) => {
        if (response) {
          setFoundProduct(response.data);
          console.log(foundProduct)
        } else {
          console.error('Product not found');
        }
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
      });
   }, [id]);
   

  const handleAddToCart = () => {
    addToCart(products.id); // Assuming you want to add 1 quantity of the product
  };
if(foundProduct !== null){
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
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    
   );}
   
}

export default ProductPage;