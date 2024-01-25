import { useLocation  } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useJwt } from 'react-jwt';
import logo from './assets/logop.jpg'
import UserService from "./services/UserService";
import LocalStorageService from "./services/LocalStorageService";
import Logout from "./components/Logout";
import Headroom from 'react-headroom';


function NavBar() {
  const location = useLocation();
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

  const isLoggedIn = user !== null;

  return (
    <Headroom>
    <div className="nav">
      <li>
        <ul><a href="/">Home</a></ul>
        <ul><a href="/catalog">Catalog</a></ul>
        <ul><img src={logo} alt="logo" style={{ height: '45px', borderRadius: '10px' }}></img></ul>
        <ul><a href="/about">About Us</a></ul>
        {!isLoggedIn ? (
          <ul><a href="/Login">Login</a></ul>
        ) : (
          <ul>
            {location.pathname === "/ProfilePage" ? (
              <Logout />
            ) : (
              <a href="/ProfilePage">{user.firstName} {user.lastName}</a>
            )}
          </ul>
        )}
      </li>
    </div>
    </Headroom>
  );
}

export default NavBar;