import React, { useEffect, useState } from 'react';
import { useJwt } from 'react-jwt';
import UserService from '../services/UserService';
import LocalStorageService from '../services/LocalStorageService';
import './ProfilePage.css';
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
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [decodedToken]);


  const handleUpdatePage = () => {
    navigate("/UpdateProfilePage")
  }

  const handleRentHistory = () => {
    if (user && user.id) {
      navigate(`/History/${user.id}`);
    }
  };

  return (
    <div className='account-content'>
      <div className='account-sidebar'>
        <h1 id='sidebar-title'>Account</h1>
        <div className='account-sidebar-links'>
          <button onClick={handleUpdatePage}>Update Profile</button>
          <button onClick={handleRentHistory}>Rent History</button>
        </div>
      </div>

      <div className="account-container">
        <h1>Account information</h1>
        {user && (
          <div className='profile-info-container'>
            <div className='profile-field'>
              <label>First Name:</label>
              <input type="text" value={user.firstName} readOnly />
            </div>

            <div className='profile-field'>
              <label>Last Name:</label>
              <input type="text" value={user.lastName} readOnly />
            </div>

            <div className='profile-field'>
              <label>Address:</label>
              <input type="text" value={user.address} readOnly />
            </div>

            <div className='profile-field'>
              <label>City:</label>
              <input type="text" value={user.city} readOnly />
            </div>

            <div className='profile-field'>
              <label>Email:</label>
              <input type="text" value={user.email} readOnly />
            </div>

            <div className='profile-field'>
              <label>Phone:</label>
              <input type="text" value={user.phone} readOnly />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
