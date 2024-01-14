import React from 'react';
import { useState, useEffect } from 'react';

const RentStep2 = ({ setData, step2Next, productList }) => {
    const [formData, setFormData] = useState({
        startDate: '',
        endDate: '',
        address: '',
        city: '',
    });

    const confirmData = () => {
        console.log("step2Data", formData);
        setData(formData);
        step2Next();
    }


    useEffect(() => {
    }, []);

    return (
        <div className='confirm-cart-container' >
            {productList.map((cartitem, index) => {
          return (
            <div className='confirm-cart-item' style={{ gridTemplateColumns: '1fr 1fr 1fr'}} key={index}>
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
    );
};

export default RentStep2;
