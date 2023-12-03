import React from 'react';
import { useState, useEffect } from 'react';
import ProductService from '../services/ProductService';


const Catalog = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        ProductService.getProducts(response => setProducts(response));
    }, []);

    function onChangeCategory(event) {
        let category = event.target.value;
        if (category === '0') {
            ProductService.getProducts(response => setProducts(response));
        } else {
            ProductService.getMachinesByCategory(category)
                .then(response => {
                    console.log(response);
                    setProducts(response);
                })
                .catch(error => {
                    console.error('Error fetching machines:', error);
                });
        }
    }

    console.log(products);

    return (
        <>
            <select onChange={onChangeCategory}>
                <option value="0">All</option>
                <option value="1">Category 1</option>
                <option value="2">Category 2</option>
            </select>

            <div className="profile-user">
                {products && products.length > 0 ? (
                    products.map((product, productIndex) => (
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
        </>
    );
};

export default Catalog;
