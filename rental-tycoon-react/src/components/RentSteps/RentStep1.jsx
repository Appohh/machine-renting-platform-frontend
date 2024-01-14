import React from 'react';
import { useCart } from '../Cart/CartContext';


const RentStep1 = () => {
  const { cart, removeFromCart } = useCart();


  return (
    <div className='confirm-cart-container'>
      {cart.map((cartitem, index) => {
        return (
          <div className='confirm-cart-item' key={index}>
            <h3>{cartitem.product.name}</h3>
            <h3>{cartitem.startDate} {cartitem.endDate}</h3>
            <h3>€{cartitem.product.price}</h3>
            {cartitem.product.files.map((file, fileIndex) => {
              console.log("file",file);
              return file.type.startsWith('image/') ? (
                <img src={file.url} alt={`Product File ${fileIndex}`} key={fileIndex} />
              ) : file.type.startsWith('video/') ? (
                <video src={file.url} controls key={fileIndex} />
              ) : null;
            })}
            <button onClick={() => removeFromCart(cartitem.product)}>Remove</button>
          </div>
        );
      })}
    </div>
  );
};

export default RentStep1;
