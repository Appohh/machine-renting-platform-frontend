import React, { useEffect } from 'react';
import { useCart } from './CartContext.jsx';
import './Cart.css';

const CartComponent = () => {
    const { cart, clearCart } = useCart();

    useEffect(() => {
        console.log('cart', cart);
    }, [cart]);

    const calculateDays = (startDate, endDate) => {
        return (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
    };

    const calculateTotalCost = () => {
        let totalCost = 0;
        cart.forEach(cartitem => {
            const days = calculateDays(cartitem.startDate, cartitem.endDate);
            totalCost += days * cartitem.product.price;
        });
        return totalCost.toFixed(2);
    };

    return (
        <div className='cart-container'>
            <h2>Cart</h2>
            <div className='cart-items'>
                <div className='cart-item'>
                    <h3>Product</h3>
                    <h3>Days</h3>
                    <h3>Daily cost</h3>
                </div>
                {cart.map((cartitem, index) => {
                    const days = calculateDays(cartitem.startDate, cartitem.endDate);
                    return (
                        <div className='cart-item' key={index}>
                            <h3>{cartitem.product.name}</h3>
                            <h3>{days}</h3>
                            <h3>€{cartitem.product.price}</h3>
                        </div>
                    );
                })}
            </div>
            <div className='cart-total'>
                <h3>Total Price: €{calculateTotalCost()}</h3>
            </div>
            <div className='button-container'>
                <button onClick={clearCart}>Clear</button>
                <button>Checkout</button>
            </div>
        </div>
    );
};

export default CartComponent;