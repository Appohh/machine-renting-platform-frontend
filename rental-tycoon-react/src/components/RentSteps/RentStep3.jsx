import React from 'react';

const RentStep3 = ( {cart} ) => {
    const products = [
        { name: 'Product 1', price: 10 },
        { name: 'Product 2', price: 20 },
        { name: 'Product 3', price: 30 },
    ];

    const totalPrice = products.reduce((acc, product) => acc + product.price, 0);

    const handleConfirmRent = () => {
        // Handle confirm rent logic here
    };

    return (
        <div>
            <h1>Rent Step 3</h1>
            <h2>Product Receipt</h2>
            <ul>
                {products.map((product, index) => (
                    <li key={index}>{product.name} - ${product.price}</li>
                ))}
            </ul>
            <h3>Total Price: ${totalPrice}</h3>
            <button onClick={handleConfirmRent}>Confirm Rent</button>
        </div>
    );
};

export default RentStep3;
