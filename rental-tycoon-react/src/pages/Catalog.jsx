import React from 'react';
import { useState, useEffect } from 'react';
import ProductService from '../services/ProductService';
import { useNavigate, useLocation } from 'react-router-dom';
import '../pages/Catalog.css'
import { useCart } from '../components/Cart/CartContext';
import AddToCartPopUp from '../components/Cart/AddToCartPopUp';

const Catalog = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryId = queryParams.get('categoryId');
    const [products, setProducts] = useState([]);
    const [nameFilter, setNameFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [maxPriceFilter, setMaxPriceFilter] = useState(10000);
    const { cart, addToCart } = useCart();
    const navigate = useNavigate();
    const [selectedProduct, setSelectedProduct] = useState(null);


    useEffect(() => {
        if (categoryId) {
            const maxPrice = maxPriceFilter ? parseFloat(maxPriceFilter) : undefined;
            ProductService.filterMachine(nameFilter, maxPrice, parseInt(categoryId))
                .then(response => {
                    setProducts(response);
                })
                .catch(error => {
                    console.error('Error filtering products:', error);
                });
            setCategoryFilter(categoryId);
        } else {
            ProductService.getAllProducts()
                .then(response => setProducts(response))
                .catch(error => {
                    console.error('Error setting products:', error);
                });
        }
    }, [categoryId]);

    function onChangeName(event) {
        setNameFilter(event.target.value);
    }

    function onChangeCategory(event) {
        setCategoryFilter(event.target.value);
    }
    function onChangeMaxPrice(event) {
        setMaxPriceFilter(event.target.value);
    }

    function applyFilters() {
        const selectedCategory = categoryFilter === '0' ? 0 : parseInt(categoryFilter);
        const maxPrice = maxPriceFilter ? parseFloat(maxPriceFilter) : undefined;

        ProductService.filterMachine(nameFilter, maxPrice, parseInt(selectedCategory))
            .then(response => {
                setProducts(response);
            })
            .catch(error => {
                console.error('Error filtering products:', error);
            });
    }

    const addProductToCart = (product) => {
        setSelectedProduct(product);
    }

    return (
        <>
            <div className="filter-container">
                <input
                    type="text"
                    placeholder="Filter by name"
                    value={nameFilter}
                    onChange={onChangeName}
                    className="filter-input"
                />
                <div className="slider-container">
                    <span className="slider-value">€{maxPriceFilter},-</span>
                    <input
                        type="range"
                        min="0"
                        max="10000"
                        value={maxPriceFilter}
                        onChange={onChangeMaxPrice}
                        className="filter-slider"
                    />
                </div>
                <select value={categoryFilter} onChange={onChangeCategory}>
                    <option value="0">All Categories</option>
                    <option value="1">Earth moving</option>
                    <option value="2">Lifting</option>
                    <option value="3">Road machine</option>
                    <option value="4">Argricultural vehicles</option>
                    <option value="5">Trucks</option>
                    <option value="6">Crushing</option>
                    <option value="7">Platforms</option>
                    <option value="8">Cranes</option>
                    <option value="9">Compressors</option>
                    <option value="10">Trailers</option>
                    <option value="11">Various</option>
                    <option value="12">Lawn Mowers</option>
                </select>
                <button className='btn-apply-filter' onClick={applyFilters}>Apply Filters</button>
            </div>

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
                                        <div className='rent-container'>
                                            {/* <button onClick={() => navigate(`/rentpage`, { state: { products: [product.id] } })} className='rent-button'>Rent</button> */}
                                            <button onClick={() => addProductToCart(product)} className='rent-button'>Rent</button>
                                            <button
                                                className='rent-button'
                                                
                                                onClick={() => navigate(`/ProductPage/${product.id}`)}
                                                >
                                                Details
                                            </button>
                                        </div>
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

            {selectedProduct && (
                <AddToCartPopUp
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}


        </>
    );
};

export default Catalog;