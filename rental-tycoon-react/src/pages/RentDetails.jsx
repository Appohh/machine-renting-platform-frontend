import React from 'react';
import { useState, useEffect } from 'react';
import RentService from '../services/RentService';
import "../pages/RentDetails.css"

const RentDetails = ({userId, rentId, clearSelectedRentId }) => {
  const [rentRowsInformation, setRentRowsInformation] = useState([]);

  useEffect(() => {
    if (userId) {
      RentService.getRentRowsHistory(rentId)
        .then((response) => {
          setRentRowsInformation(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userId, rentId]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(); 
  }

  return (
    <div className="rent-detail-page">
      <button className='rent-detail-back-button' onClick={clearSelectedRentId}>Back to Rent History</button>
      <h2>Detail Page for Rent: {rentId}</h2>
      {rentRowsInformation.map((details) => (
        <div key={details.product.id} className="card-rent-detail">
          <div className="card-image-detail">
            <img src={details.product.files[0].url} alt={details.product.name} />
          </div>
          <div className="details-container">
            <h2>{details.product.name}</h2>
            <p>startDate: {formatDate(details.rentRow.startDate)} </p>
            <p>EndDate: {formatDate(details.rentRow.endDate)}</p>
            <p>Price: ${details.product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RentDetails;