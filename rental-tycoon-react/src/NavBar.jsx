import { useLocation, useNavigate  } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useJwt } from 'react-jwt';
import logo from './assets/react.svg'
import UserService from "./services/UserService";
import LocalStorageService from "./services/LocalStorageService";
import Logout from "./components/Logout";



function NavBar() {
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    useEffect(() => {
      const token = LocalStorageService.get();
      if (token) {
        const { decodedToken } = useJwt(token);
        if (decodedToken != null) {
          const userId = decodedToken.userId;
          UserService.getUserById(userId)
            .then((response) => {
              setUser(response);
              setIsLoggedIn(true);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }
    }, []);
  
    return (
      <div className="nav">
        <li>
          <ul><a href="/">Home</a></ul>
          <ul><a href="/catalog">Catalog</a></ul>
          <ul><img src={logo} alt="logo"></img></ul>
          <ul><a href="/">About</a></ul>
          {isLoggedIn ? (
            <ul>
              {location.pathname === "/ProfilePage" ? (
                <Logout />
              ) : (
                <a href="/ProfilePage">You <img src={user && user.profilePicture} className="profile-image" alt="profile" /></a>
              )}
            </ul>
          ) : (
            <ul><a href="/Login">Login</a></ul>
          )}
        </li>
      </div>
    );
  }
  
  export default NavBar;