import React, { useEffect, useState } from 'react';
import { useJwt } from 'react-jwt';
import UserService from '../services/UserService';
import LocalStorageService from '../services/LocalStorageService';

import { useNavigate } from 'react-router-dom';

function ProfilePage() {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const token = LocalStorageService.get();
  const { decodedToken } = useJwt(token || "");

  useEffect(() => {
    if (decodedToken) {
      const userId = decodedToken.userId;
      UserService.getUserById(userId)
        .then((response) => {
          setUser(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [decodedToken]);

  
  const handleUpdatePage = () =>
  {
    navigate("/UpdateProfilePage")
  }

  const handleRentHistory = () => {
    if (user && user.id) {
      navigate(`/History/${user.id}`); 
    }
  };

  return (
    <div className="profile-page">
      {user && (
        <div>
          <label>First Name:</label>
          <input type="text" value={user.firstName} readOnly />

          <label>Last Name:</label>
          <input type="text" value={user.lastName} readOnly />

          <label>Address:</label>
          <input type="text" value={user.address} readOnly />

          <label>City:</label>
          <input type="text" value={user.city} readOnly />

          <label>Email:</label>
          <input type="text" value={user.email} readOnly />

          <label>Phone:</label>
          <input type="text" value={user.phone} readOnly />
        </div>
      )}
      <div className="submit" onClick={handleUpdatePage}>Update Information</div>
      <div className='See-rents' onClick={handleRentHistory}>
          Rent History
      </div>
    </div>  
  );
}

export default ProfilePage;
