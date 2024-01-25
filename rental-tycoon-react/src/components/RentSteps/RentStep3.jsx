import React, { useState, useEffect } from 'react';
import UserService from '../../services/UserService.js'
import { useCart } from '../Cart/CartContext';
import RentService from '../../services/RentService.js';


const RentStep3 = ({ step3Next, userId, productList, cart, rentInfo }) => {
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [deliveryCost, setDeliveryCost] = useState(50);
    const [subtotal, setSubtotal] = useState(0);
    const [vat, setVat] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [code, setCode] = useState("");
    const [responseCode, setResponseCode] = useState("");
    const [message, setMessage] = useState("");

    const handleConfirmRent = () => {
        step3Next(totalPrice, discount);
    };
    const calculateTotalCost = () => {
        let totalCost = 0;
        cart.forEach(cartitem => {
            const days = calculateDays(cartitem.startDate, cartitem.endDate);
            totalCost += days * cartitem.product.price;
        });
        return totalCost.toFixed(2);
    };

    const handleCreateDiscount = () => {
        try {
            const total = subtotal;
            RentService.getDiscountAmount(total, code).then((data) => {
                setDiscount(data.discountAmount);
                setResponseCode(data.code);
                setCode("");
                setMessage("");
            }).catch(() => {
                setDiscount(0);
                setResponseCode(code)
                setCode("");
                setMessage("Invalid discount: ");
            });
        } catch (error) {
            setDiscount(0);
            setCode("");
            setMessage("Invalid discount: ");
        }
    }

    const handleRemoveDiscount = () => {
        setDiscount(0);
        setCode("");
    }

    const calculateTotalPriceForOneItem = (product, cart) => {
        let totalCost = 0;
        cart.map((cartitem, index) => {
            if (product.id === cartitem.product.id){
                const days = calculateDays(cartitem.startDate, cartitem.endDate);
                totalCost += days * product.price;
            }
        })
        
        return totalCost.toFixed(2);
    };

    useEffect(() => {
        if (cart.length > 0) {
            setCartItems(cart);
        }
    }, [cart]);


    useEffect(() => {
        if (productList.length > 0) {
            setProducts(productList);
        } else {
            console.log("productList not found");
        }
    }, [productList]);

    useEffect(() => {
        if (userId) {
            UserService.getUserById(userId).then((data) => {
                setUser(data);
                console.log("user", data);
            });
        } else {
            console.log("userId not found");
        }
    }, [userId]);
    const calculateDays = (startDate, endDate) => {
        return (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
    };
    const getStartDate = () => {
        let startDate = ""; 
        cart.forEach(cartitem => {
            startDate = cartitem.startDate;
        });
        return startDate;
    }
    const getEndDate = () => {
        let endDate = "";  
        cart.forEach(cartitem => {
            endDate = cartitem.endDate;
        });
        return endDate;
    }

    useEffect(() => {
        try {
            const totalCost = parseFloat(calculateTotalCost());
            const deliveryCostValue = parseFloat(deliveryCost);

            const vatValue = (totalCost + deliveryCostValue) * 0.2;

            const totalWithVat = totalCost + vatValue;
            const subWithVatValue = totalWithVat + deliveryCostValue;

            setTotalPrice(totalCost.toFixed(2));
            setVat(vatValue.toFixed(2));
            setSubtotal(subWithVatValue.toFixed(2));
        } catch (error) {
            console.error("Error in useEffect:", error);
        }
    }, [cartItems, deliveryCost]);

    return (
        <>
            <div className='confirm-cart-container' >
                {productList.map((cartitem, index) => {
                    return (
                        <div className='confirm-cart-item' style={{ gridTemplateColumns: '1fr 1fr 1fr' }} key={index}>
                            <h3>{cartitem.name}</h3>
                            <h3>€{calculateTotalPriceForOneItem(cartitem, cart)}</h3>
                            {cartitem.files.map((file, fileIndex) => {
                                console.log("file", file);
                                return file.type.startsWith('image/') ? (
                                    <img src={file.url} alt={`Product File ${fileIndex}`} key={fileIndex} style={{ height: '110px', width: '140px' }} />
                                ) : file.type.startsWith('video/') ? (
                                    <video src={file.url} controls key={fileIndex} style={{ height: '110px', width: '140px' }} />
                                ) : null;
                            })}

                            <h4>Start Date: {getStartDate()}</h4>
                            <h4>End Date: {getEndDate()}</h4>
                        </div>
                    );
                })}
            </div>
            <div className={`confirm-cart-details confirm-cart-details-step3`}>
                <h3>Deliver at my address</h3>
                <h4>{user?.firstName} {user?.lastName}</h4>
                {/* TODO: get selected adress details */}
                <h4>{rentInfo?.address}, {rentInfo?.city}</h4>
            </div>

            <div className='order-receipt-container'>
                <h2>Price details</h2>
                <div className='order-receipt'>
                    <h3>Products</h3>
                    <h3>€{totalPrice}</h3>
                    <h3>Delivery</h3>
                    <h3>€{deliveryCost}</h3>
                    <h3 className='vat-total'>VAT</h3>
                    <h3 className='vat-total'>€{vat}</h3>
                    <h3 className='sub-total'>Subtotal</h3>
                    <h3 className='sub-total'>€{subtotal}</h3>
                    <input
                        type='text'
                        id='discount-input'
                        className='discount-input'
                        placeholder='Enter discount code'
                        value={code}
                        onChange={(e) => {
                            setCode(e.target.value);
                        }}
                    />
                    <button className='discount-submit' onClick={handleCreateDiscount}>Ok</button>
                    {message && (
                        <>
                            <p className="discount-error-message">{message}</p>
                            <p className="discount-error-message">{responseCode}</p>
                        </>
                    )}
                    {discount !== 0 && (
                        <>
                            <button onClick={handleRemoveDiscount} className='receipt-remove-discount' style={{ color: 'green' }}>Remove discount code:</button>
                            <button onClick={handleRemoveDiscount} className='receipt-remove-discount' style={{ color: 'green' }}> {responseCode}</button>
                            <h3 className='receipt-discount'>Discount</h3>
                            <h3 className='receipt-discount'>€{discount}</h3>
                        </>
                    )}
                    {discount <= 0 ? (
                        <>
                            <h3>Total</h3>
                            <h3>€{subtotal}</h3>
                        </>
                    ) : (
                        <>
                            <h3>Total</h3>
                            <div className='receipt-total-discounted'>
                                <h3 style={{ color: '#3a893a', textShadow: '0px 0px 20px #000000cc', fontSize: '25px' }}>€{subtotal - discount}</h3>
                                <h3 style={{ color: 'red', textDecoration: 'line-through' }}>€{subtotal}</h3>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className='rent-step3-button'>
                <button onClick={handleConfirmRent}>Confirm Rent</button>
            </div>
        </>
    );
};

export default RentStep3;