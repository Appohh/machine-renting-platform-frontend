import { useState, useEffect } from "react";


function Products({ product }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (product && Array.isArray(product.files) && post.files.length > 0) {
        setProducts(post.files);
    } else {
        setProducts([]);
    }
  }, [product]);

  return (
    <div className="profile-user">
      <div className="post-content">
        {products.map((files, index) => {
          const isImage = files.type.startsWith("image/");
          const isVideo = files.type.startsWith("video/");

          return (
            <div key={index}>
              {isImage ? (
                <img
                  src={files.url}
                  alt={`Product File ${index}`}
                  className="post-image"
                />
              ) : isVideo ? (
                <video
                  src={files.url}
                  controls
                  className="post-video"
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Products;