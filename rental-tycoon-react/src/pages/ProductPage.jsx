import { useState, useEffect } from "react";
import './ProductPage.css';
import ProductService from "../services/ProductService";
import { useLocation } from 'react-router-dom';

function ProductPage() {
  const location = useLocation();
  const products = location.state.products;
  const [foundProduct, setFoundProduct] = useState([]);


  useEffect(() => {
    ProductService.getProducts(products.name)
      .then((response) => {
        console.log('API Response:', response);
        if (response) {
            setFoundProduct(response);
        } else {
            setFoundProduct([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching user posts:', error);
      });
  }, [products]);

  return (
    <div className="profile-user">
        {products.files.map((files, index) => {
          if (index === 0) {
            const isImage = files.type.startsWith("image/");
            const isVideo = files.type.startsWith("video/");

            return (
              <div className="post-content" key={index}>
                {isImage ? (
                  <img
                    src={files.url}
                    alt={`Product File ${index}`}
                  />
                ) : isVideo ? (
                  <video
                    src={files.url}
                    controls
                  />
                ) : null}
                <div className="product-name">{products.name}</div>
                <div className="product-price">€{products.price},-</div>
              </div>
            );
          }
          return null;
        })}
    </div>
  );
}

export default ProductPage;