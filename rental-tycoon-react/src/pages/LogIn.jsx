import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService'

function LogIn() {
    
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
    
      const handleChange = (name, value) => {
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      const validateEmail = () => {
        const { email } = formData;
    
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          setEmailError("Please enter a valid email address");
        } else {
          setEmailError("");
        }
      };
    
      const handleRegisterPage = () =>
      {
        navigate("/register")
      }

      const handleLogin = () => {
        AuthService.login(formData.email, formData.password)
          .then(() => {
            // Handle successful login, e.g., store tokens in local storage and redirect
            console.log("Login successful");
            navigate("/");
          })
          .catch((error) => {
            // Handle login failure, e.g., display an error message
            console.log("Login failed: ", error);
          });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
      
        handleLogin();
      };

  return (
    <div className='container'>
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      
      <div className="inputs">
        <div className="input">
          <img src="" alt=""/>
          <input className="input"
            type="text" 
            placeholder='Email'
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>

        <div className="input">
          <img src="" alt=""/>
          <input className="input"
            type="password" 
            placeholder='Password'
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </div>

      </div>

      <div className='forgot-password'>Dont have an account?</div>
      <div className="submit" onClick={handleRegisterPage}>Click Here</div>
      
      
      <div className='submit-container'>
        <div className="submit" onClick={handleSubmit}>Log In</div>
      </div>
    </div>
  );
}

export default LogIn;