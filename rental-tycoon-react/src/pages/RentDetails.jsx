import React from 'react';
import { useState, useEffect } from 'react';
import RentService from '../services/RentService';
import { useLocation } from 'react-router-dom';
import "../pages/RentDetails.css"

const RentDetails = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId');
  const rentId = searchParams.get('rentId');
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
      <h2>Detail Page for Rent: {rentId}</h2>
      {rentRowsInformation.map((details) => (
        <div key={details.product.id} className="card-rent-detail">
          <div className="card-image-detail">
            <img src={details.product.files[0].url} alt={details.product.name} />
          </div>
          <div className="details-container">
            <h3>{details.product.name}</h3>
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