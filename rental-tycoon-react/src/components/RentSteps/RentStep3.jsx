import React from 'react';
import { useState, useEffect } from 'react';
import ProductService from '../../services/ProductService'

const RentStep3 = ( {cart, step3Next} ) => {
    const products = [

    ];

    useEffect(() => {

    }, []);

    const totalPrice = products.reduce((acc, product) => acc + product.price, 0);

    const handleConfirmRent = () => {

        step3Next();
    };

    return (
        <div>
            <h2>Rent Confirmation</h2>
            <ul>
                {products.map((product, index) => (
                    <li key={index}>{product.name} - ${product.price}</li>
                ))}
            </ul>
            {/* <h3>Total Price: ${totalPrice}</h3> */}
            <button onClick={handleConfirmRent}>Confirm Rent</button>
        </div>
    );
};

export default RentStep3;
