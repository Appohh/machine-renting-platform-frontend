import React from 'react';
import { useState, useEffect } from 'react';
import ProductService from '../../services/ProductService';

const RentStep1 = ({ cart, step1Next }) => {
  const [productList, setProductList] = useState({
    product: null
})
        console.log("cartx",cart);

        useEffect(() => {
          if (cart.length > 0) {
            Promise.all(
              cart.map(element =>
                ProductService.getProductByProductId(element)
                  .then(response => response)
                  .catch(error => {
                    console.error('Error fetching product:', error);
                    return null;
                  })
              )
            )
              .then(products => {
                setProductList(products.filter(product => product !== null));
              })
              .catch(error => {
                console.error('Error fetching products:', error);
              });
          }
        }, [cart]);


        return (
          <div>
            <h2>Products to rent:</h2>
            <div className="profile-user">
              {productList.length > 0 ? (
                productList.map((product, productIndex) => (
                  <div className="product-container" key={productIndex}>
                    <div className="product-details">
                      <div className="product-name">{product.name}</div>
                      <div className="product-price">€{product.price},-</div>
                    </div>
                    <div className="product-files">
                      {product.files.map((file, index) => (
                        <div className="post-content" key={index}>
                          {file.type.startsWith('image/') ? (
                            <img src={file.url} alt={`Product File ${index}`} />
                          ) : file.type.startsWith('video/') ? (
                            <video src={file.url} controls />
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div>No products found</div>
              )}
            </div>
            <button onClick={step1Next}>Next</button>
          </div>
        );
      };
      
      export default RentStep1;
