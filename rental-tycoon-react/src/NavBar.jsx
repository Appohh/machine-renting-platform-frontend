import { useLocation  } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useJwt } from 'react-jwt';
import logo from './assets/react.svg'
import UserService from "./services/UserService";
import LocalStorageService from "./services/LocalStorageService";
import Logout from "./components/Logout";


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
    <div className="nav">
      <li>
        <ul><a href="/">Home</a></ul>
        <ul><a href="/catalog">Catalog</a></ul>
        <ul><img src={logo} alt="logo"></img></ul>
        <ul><a href="/">About</a></ul>
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
  );
}

export default NavBar;