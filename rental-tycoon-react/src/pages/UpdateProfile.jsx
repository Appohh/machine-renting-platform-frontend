import React, { useEffect, useState } from 'react';
import { useJwt } from 'react-jwt';
import UserService from '../services/UserService';
import LocalStorageService from '../services/LocalStorageService';
import './UpdateProfile.css';
import { useNavigate } from 'react-router-dom';

function UpdateProfilePage() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const token = LocalStorageService.get();
  const { decodedToken } = useJwt(token || "");
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    if (decodedToken) {
      const userId = decodedToken.userId;
      retrieveUser(userId);
    }
  }, [decodedToken]);

  const retrieveUser = (userId) => {
      UserService.getUserById(userId)
        .then((response) => {
          setUser(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setIsEditable(false);
    retrieveUser(user.id)
  };

  const renderButtons = () => {
    if (isEditable) {
      return (
        <div className='profile-page-confirm-cancel-button'>
          <div className="cancel-button" onClick={handleCancel}>
            Cancel
          </div>
          <div className="confirm-button" onClick={handleSubmit}>
            Confirm Changes
          </div>
        </div>
      );
    } else {
      return (
        <div className="edit-button" onClick={toggleEditable}>
          Edit Profile
        </div>
      );
    }
  };

  const handleSubmit = async () => {
    console.log(user);
    try {
      // Assuming user state has all the updated details
      await UserService.updateUserDetails(
        user.id,
        user.firstName,
        user.lastName,
        user.address,
        user.city,
        user.email,
        user.phone
      );
      setIsEditable(false);
      console.log("Success changes");
    } catch (error) {
      console.error("Error updating user details:", error);
      // Handle error if needed
    }
  };

  const toggleEditable = () => {
    setIsEditable(!isEditable);
    
  };

  return (
    <div className="profile-page">
      <h1>User Details</h1>
      {user && (
        <div>
          <div className='profile-page-box-firstName-lastName'>
            <div className='profile-page-box-firstName'>
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                readOnly={!isEditable}
              />
              </div>
              <div className='profile-page-box-firstName'>
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                readOnly={!isEditable}
              />
            </div> 
          </div>

          <div className='profile-page-box-email'>
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={handleChange}
              readOnly={!isEditable}
            />
          </div>

          <div className='profile-page-box-address'>
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={user.address}
              onChange={handleChange}
              readOnly={!isEditable}
            />
          </div>

          <div className='profile-page-box-city'>
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={user.city}
              onChange={handleChange}
              readOnly={!isEditable}
            />
          </div>

          <div className='profile-page-box-phone'>
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              readOnly={!isEditable}
            />
          </div>
          {renderButtons()}
        </div>
      )}
    </div>
  );
}

export default UpdateProfilePage;