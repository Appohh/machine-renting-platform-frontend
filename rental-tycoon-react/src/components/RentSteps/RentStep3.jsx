import React, { useState, useEffect } from 'react';
import UserService from '../../services/UserService.js'
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

    const handleConfirmRent = () => {
        step3Next(totalPrice, discount);
    };

    const handleCreateDiscount = () => {
        try{
            const total = subtotal + vat;
            RentService.getDiscountAmount(total, code).then((data) => {
                setDiscount(data.discountAmount)
            })
        }catch{
            setDiscount(0);
        }
    }

    const handleRemoveDiscount = () => {
        setDiscount(0);
        setCode("");
    }

    useEffect(() => {
        if (cart.length > 0) {
            setCartItems(cart);
        }
    }, [cart]);

    useEffect(() => {
        console.log("cartItems", cartItems);
    }, [cartItems]);

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

    useEffect(() => {
        const total = cartItems.reduce((sum, item) => sum + item.product.price, 0);
        setTotalPrice(total);
        const sub = total + deliveryCost;
        setSubtotal(sub);
        setVat(sub * 0.2);
    }, [cartItems, deliveryCost]);

    

    return (
        <>
            <div className='confirm-cart-container' >
                {productList.map((cartitem, index) => {
                    return (
                        <div className='confirm-cart-item' style={{ gridTemplateColumns: '1fr 1fr 1fr' }} key={index}>
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
                    {discount !== 0 && (
                            <>
                                <button onClick={handleRemoveDiscount} className='receipt-remove-discount'>Remove discount code:</button>
                                <button onClick={handleRemoveDiscount} className='receipt-remove-discount'> {code}</button>
                                <h3 className='receipt-discount'>Discount</h3>
                                <h3 className='receipt-discount'>€{discount}</h3>
                            </>
                        )}
                    <h3>Total</h3>
                    <h3>€{subtotal + vat - discount}</h3>
                </div>
            </div>
            <div className='rent-step3-button'>
                <button onClick={handleConfirmRent}>Confirm Rent</button>
            </div>
        </>
    );
};

export default RentStep3;