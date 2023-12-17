import React, { useEffect, useState } from 'react';
import RentService2 from '../services/RentService2';
import { useParams } from 'react-router-dom';
import "./rentHistory.css"

function RentHistory() {
  const [rentInformation, setRentInformation] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      RentService2.getRentHistory(userId)
        .then((response) => {
          setRentInformation(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userId]);


  return (
    <div className="rent-history-page">
      {rentInformation.map((rentInfo, index) => (
        <div key={index} className="rent-card">
          <img src={rentInfo.product.files[0].url} alt="Image problem"/>
          <p className="product-name">{rentInfo.product.name}</p>
          <p className="rent-price">€{rentInfo.product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default RentHistory;