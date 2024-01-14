  import React, { useEffect, useState } from 'react';
  import { useJwt } from 'react-jwt';
  import UserService from '../services/UserService';
  import LocalStorageService from '../services/LocalStorageService';
  import './ProfilePage.css';
  import UpdateProfile from './UpdateProfile';
  import RentHistory from './RentHistory';

  function ProfilePage() {
    const [user, setUser] = useState(null);
    const [currentSection, setCurrentSection] = useState('updateProfile');

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


    const renderSection = () => {
      switch (currentSection) {
        case 'updateProfile':
          return <UpdateProfile/>;
        case 'rentHistory':
          return <RentHistory userId={user?.id}/>;
        default:
          return <UpdateProfile user={user} setUser={setUser}/>;
      }
    };
    
    return (
      <div className='account-content'>
        <div className='account-sidebar'>
          <div className='account-sidebar-links'>
            <button onClick={() => setCurrentSection('updateProfile')}>Update Profile</button>
            <button onClick={() => setCurrentSection('rentHistory')}>Rent History</button>
          </div>
        </div>
  
        <div className="account-container">
          {renderSection()}
        </div>
      </div>
    );
  }
  
  export default ProfilePage;
