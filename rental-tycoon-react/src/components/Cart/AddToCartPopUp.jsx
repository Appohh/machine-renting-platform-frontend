import React from 'react';
import { useCart } from './CartContext.jsx';

const AddToCartPopUp = ({ product, onClose }) => {
    const { addToCart } = useCart();

    const handleAddToCart = (event) => {
        event.preventDefault();
        const cartItem = {
            product: product,
            startDate: event.target.startDate.value,
            endDate: event.target.endDate.value,
        };
        addToCart(cartItem);
        onClose();
    }

    return (
        <div className='add-to-cart-popup'>
            <div className='add-to-cart-popup-container'>
                <div className='add-to-cart-popup-close' onClick={onClose}>
                    X
                </div>
                <h2>Select a date for {product.name}</h2>
                <form className='add-to-cart-popup-datepickers-container' onSubmit={handleAddToCart}>
                    <div className='add-to-cart-popup-datepickers'>
                        <div className='date-picker-container-start'>
                            <h2>From</h2>
                            <input type='date' name='startDate' required />
                        </div>
                        <div className='date-picker-container-end'>
                            <h2>Until</h2>
                            <input type='date' name='endDate' required />
                        </div>
                    </div>
                    <div className='add-to-cart-popup-button-container'>
                        <button type='button' onClick={onClose}>Cancel</button>
                        <button type='submit'>Add to Cart</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddToCartPopUp;