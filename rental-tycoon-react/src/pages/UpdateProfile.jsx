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
      UserService.getUserById(userId)
        .then((response) => {
          setUser(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [decodedToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    navigate("/profilePage");
  };

  const handleSubmit = async () => {
    console.log(user)
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
      // Optionally, you can update the local user state if needed
      // setUser(updatedUser);
      console.log("Success changes")
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
      {user && (
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            readOnly={!isEditable}
          />

          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            readOnly={!isEditable}
          />

          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={user.address}
            onChange={handleChange}
            readOnly={!isEditable}
          />

          <label>City:</label>
          <input
            type="text"
            name="city"
            value={user.city}
            onChange={handleChange}
            readOnly={!isEditable}
          />

          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={handleChange}
            readOnly={!isEditable}
          />

          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            readOnly={!isEditable}
          />
        </div>
      )}

      <div className="edit-button" onClick={toggleEditable}>
        {isEditable ? 'Confirm' : 'Edit Profile'}
      </div>

      <div className="submit" onClick={handleCancel}>
        Cancel
      </div>

      <div className='submit-container'>
        <div className="submit" onClick={handleSubmit}>Submit changes</div>
      </div>

    </div>
  );
}

export default UpdateProfilePage;