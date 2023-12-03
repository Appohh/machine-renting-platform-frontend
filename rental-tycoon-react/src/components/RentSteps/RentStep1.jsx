import React from 'react';
import { useState, useEffect } from 'react';

const RentStep1 = ({ cart, step1Next }) => {


    useEffect(() => {
        console.log(cart);
    }, []);

  return (
    <div>
      <h2>Products to rent:</h2>
      {cart.map((element, index) => (
                <a key={index}>{element}</a>
            ))}

        <button onClick={step1Next}>Next</button>
    </div>
  );
};

export default RentStep1;
