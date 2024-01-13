  import React, { useEffect, useState } from 'react';
  import { useJwt } from 'react-jwt';
  import UserService from '../services/UserService';
  import LocalStorageService from '../services/LocalStorageService';
  import './ProfilePage.css';
  import { useNavigate } from 'react-router-dom';

  function ProfilePage() {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);

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

    const handleInputChange = (e, field) => {
      setUser((prevUser) => ({
        ...prevUser,
        [field]: e.target.value,
      }));
    };
    const handleUpdatePage = () => {
      navigate("/UpdateProfilePage")
    }

    const handleRentHistory = () => {
      if (user && user.id) {
        navigate(`/History/${user.id}`);
      }
    };
    const handleSaveChanges = async () => {
      // Implement the logic to save changes using the UserService
      try {
        await UserService.updateUserDetails(
          user.id,
          user.firstName,
          user.lastName,
          user.address,
          user.city,
          user.email,
          user.phone
        );
        console.log("Success changes");
        setEditMode(false); // Exit edit mode after saving changes
      } catch (error) {
        console.error("Error updating user details:", error);
        // Handle error if needed
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
            <>
              <div className='profile-info-container'>
                <div className='profile-field'>
                  <label>First Name:</label>
                  <input type="text" value={user.firstName} readOnly={!editMode} onChange={(e) => handleInputChange(e, 'firstName')} />
                </div>

                <div className='profile-field'>
                  <label>Last Name:</label>
                  <input type="text" value={user.lastName} readOnly={!editMode} onChange={(e) => handleInputChange(e, 'lastName')}/>
                </div>

                <div className='profile-field'>
                  <label>Address:</label>
                  <input type="text" value={user.address} readOnly={!editMode} onChange={(e) => handleInputChange(e, 'address')} />
                </div>

                <div className='profile-field'>
                  <label>City:</label>
                  <input type="text" value={user.city} readOnly={!editMode} onChange={(e) => handleInputChange(e, 'city')} />
                </div>

                <div className='profile-field'>
                  <label>Email:</label>
                  <input type="text" value={user.email} readOnly={!editMode} onChange={(e) => handleInputChange(e, 'email')} />
                </div>

                <div className='profile-field'>
                  <label>Phone:</label>
                  <input type="text" value={user.phone} readOnly={!editMode} onChange={(e) => handleInputChange(e, 'phone')}/>
                </div>
              </div>
              {!editMode &&
                <button onClick={() => setEditMode(true)}>Edit</button>
              }
              {editMode &&
                <button onClick={() => setEditMode(false)}>Cancel Edit</button>
              }
              {editMode &&
                <button onClick={handleSaveChanges}>Update</button>
              }


            </>
          )}
        </div>
      </div>
    );
  }

  export default ProfilePage;
