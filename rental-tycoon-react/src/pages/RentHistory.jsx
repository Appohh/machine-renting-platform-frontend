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
            <div className='rent-card-details'>
              <div className="rent-card-timestamp">
                <label>Date:</label>
                <p className='rent-timestamp'>{formatDate(rentInfo.timestamp)} </p>
              </div>
              <div className="rent-card-address">
                <label>Address:</label>
                <p className='rent-Address'>{rentInfo.address} </p>
              </div>
              <div className="rent-card-city">
                <label>City:</label>
                <p className='rent-city'>{rentInfo.city} </p>
              </div>
              <div className='rent-card-price'>
                <label>Price:</label>
              <p className="rent-price">€{rentInfo.total.toFixed(2)}</p>
              </div>
          </div>
        </div>   
      ))
      )}
    </div>
  );
}

export default RentHistory;