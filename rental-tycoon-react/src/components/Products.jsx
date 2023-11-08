import { useState, useEffect } from "react";
import './Products.css';

function Products({ product }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (product && Array.isArray(product.files) && product.files.length > 0) {
        setProducts(product.files);
    } else {
        setProducts([]);
    }
  }, [product]);

  return (
    <div className="profile-user">
        {products.map((files, index) => {
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
                <div className="product-name">{product.name}</div>
                <div className="product-price">€{product.price},-</div>
              </div>
            );
          }
          return null;
        })}
    </div>
  );
}

export default Products;