import React from 'react';
import { useState, useEffect } from 'react';
import ProductService from '../../services/ProductService'

const RentStep3 = ( {step3Next} ) => {
 

    const handleConfirmRent = () => {

        step3Next();
    };

    return (
        <div>
            <button onClick={handleConfirmRent}>Confirm Rent</button>
        </div>
    );
};

export default RentStep3;
