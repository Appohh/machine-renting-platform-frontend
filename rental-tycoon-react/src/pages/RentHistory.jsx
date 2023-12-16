import React, { useEffect, useState } from 'react';
import RentService2 from '../services/RentService';

function RentHistory({ userId }) {
  const [rentHistory, setRentHistory] = useState([]);

  useEffect(() => {
    if (userId) {
      RentService2.getRentHistory(userId)
        .then((history) => {
          setRentHistory(history);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userId]);


  return (
    <div className="rent-history-page">
      {/* Display rent history */}
    </div>
  );
}

export default RentHistory;
