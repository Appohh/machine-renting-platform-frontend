import React, { useState, useEffect } from 'react';
import { useCart } from '../Cart/CartContext';
import ProductService from '../../services/ProductService';

const RentStep1 = ({ step1Next }) => {
  const { cart, removeFromCart } = useCart();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const products = await Promise.all(cart.map(item => ProductService.getProductById(item.product.id)));
      setCartItems(products);
      console.log("cartItems", cartItems);
    };

    fetchProductDetails();
  }, [cart]);
  const calculateDays = (startDate, endDate) => {
    return (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
};
  useEffect(() => {
    console.log("cartItems", cartItems);
  }, [cartItems]);
  const calculateTotalCost = () => {
    let totalCost = 0;
    cart.forEach(cartitem => {
        const days = calculateDays(cartitem.startDate, cartitem.endDate);
        totalCost += days * cartitem.product.price;
    });
    return totalCost.toFixed(2);
};

  const handleStepNext = () => {
    step1Next(cartItems);
  };

  return (
    <>
      <div className='confirm-cart-container'>
        {cartItems.map((cartitem, index) => {
          return (
            <div className='confirm-cart-item' key={index}>
              <h3>{cartitem.name}</h3>
              <h3>€{cartitem.price}</h3>
              {cartitem.files.map((file, fileIndex) => {
                console.log("file", file);
                return file.type.startsWith('image/') ? (
                  <img src={file.url} alt={`Product File ${fileIndex}`} key={fileIndex} style={{ height: '110px', width: '140px' }} />
                ) : file.type.startsWith('video/') ? (
                  <video src={file.url} controls key={fileIndex} style={{ height: '110px', width: '140px' }} />
                ) : null;
              })}
              <button className='remove-cart-confirm-item' onClick={() => removeFromCart(cartitem)}>Remove</button>
            </div>
          );
        })}
      </div>
      <div className='confirm-cart-button-container'>
        <button onClick={handleStepNext} className='confirm-cart-button'>Confirm</button>
      </div>
    </>
  );
};

export default RentStep1;