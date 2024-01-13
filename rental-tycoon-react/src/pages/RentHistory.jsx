import React, { useEffect, useState } from 'react';
import RentService from '../services/RentService';
import { useParams, Link } from 'react-router-dom';
import "./rentHistory.css"

function RentHistory() {
  const [rentInformation, setRentInformation] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      RentService.getRentHistory()
        .then((response) => {
          setRentInformation(response.rents);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userId]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(); 
  }


  return (
    <div className="rent-history-page">
      <h2>Your Rent History</h2>
      {rentInformation.map((rentInfo) => (
        <Link
        key={rentInfo.id}
        to={`/rentDetails?userId=${userId}&rentId=${rentInfo.id}`}
        className='rent-card'
        style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <div className="rent-card-header">
            <p>Date:</p>
            <p>Address:</p>
            <p>City:</p>
            <p>Total Price:</p>
          </div>
          <div className="rent-card-details">
            <p className='rent-timestamp'>{formatDate(rentInfo.timestamp)} </p>
            <p className="rent-address">{rentInfo.address}</p>
            <p className='rent-city'>{rentInfo.city}</p>
            <p className="rent-price">€{rentInfo.total.toFixed(2)}</p>
          </div>   
      </Link>
      ))}
    </div>
  );
}

export default RentHistory;