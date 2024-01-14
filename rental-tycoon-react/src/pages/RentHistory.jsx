import React, { useEffect, useState } from 'react';
import RentService from '../services/RentService';
import RentDetails from './RentDetails';
import "./rentHistory.css"

function RentHistory({userId}) {
  const [rentInformation, setRentInformation] = useState([]);
  const [selectedRentId, setSelectedRentId] = useState(null);

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

   useEffect(() => {
    if (setSelectedRentId) {
      setSelectedRentId(null);
    }
  }, [setSelectedRentId]);

  const clearSelectedRentId = () => {
    setSelectedRentId(null); 
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(); 
  }

  const showRentDetails = (rentId) => {
    setSelectedRentId(rentId);
  }

  return (
    <div className="rent-history-page">
      <h2>Your Rent History</h2>
      {selectedRentId ? (
        <RentDetails userId={userId} rentId={selectedRentId} clearSelectedRentId={clearSelectedRentId} />
      ) : (
        rentInformation.map((rentInfo) => (
          <div
            key={rentInfo.id}
            className='rent-card'
            onClick={() => showRentDetails(rentInfo.id)}
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
        </div>
      ))
      )}
    </div>
  );
}

export default RentHistory;