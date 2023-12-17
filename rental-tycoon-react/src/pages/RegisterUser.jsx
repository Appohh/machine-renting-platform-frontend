import React, { useState } from 'react';
import './RegisterUser.css';
import CustomerService from '../services/CustomerService';

function RegisterUser() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    phone: "",

  });

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validatePassword = () => {
    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    } else if (!/(?=.*[A-Z])(?=.*\d)/.test(password)) {
      setPasswordError("Password must contain at least 1 capital letter and 1 number");
      setConfirmPasswordError(""); // Reset confirm password error if password format is incorrect
    } else {
      setPasswordError("");
      setConfirmPasswordError("");
    }
  };

  const validateAge = () => {
    const { birthDate } = formData;
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

    if (birthDate > eighteenYearsAgo) {
      setAgeError("You must be at least 18 years old to register.");
    } else {
      setAgeError("");
    }
  };

  const validateEmail = () => {
    const { email } = formData;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasErrors = false;

    for (const key in formData) {
      if (formData[key] === "") {
        alert("Please enter your ${key}.");
        hasErrors = true;
      }
    }

    validatePassword();
    validateAge();
    validateEmail();

    if (passwordError || confirmPasswordError || ageError || emailError) {
      hasErrors = true;
    }

    if (!hasErrors) {
      // Assuming UserService is imported and defined elsewhere
      CustomerService.registerUser(formData)
        .then((data) => console.log("User Registered: ", data))
        .catch((error) => console.log("Registration failed: ", error));
    }
  };

  return (
    <div className='container'>
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>
      
      <div className="inputsreg">
        <div>
          <img src="" alt=""/>
          <input className='inputreg'
            type="text" 
            placeholder='Email'
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>

        <div className="inputsreg">
          <img src="" alt=""/>
          <input className='inputreg'
            type="text" 
            placeholder='First Name'
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
        </div>

        <div className="inputsreg">
          <img src="" alt=""/>
          <input className='inputreg'
            type="text" 
            placeholder='Last Name'
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        </div>

        <div className="inputsreg">
          <img src="" alt=""/>
          <input className='inputreg'
            type="text" 
            placeholder='Address'
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        </div>

        <div className="inputsreg">
          <img src="" alt=""/>
          <input className='inputreg'
            type="text" 
            placeholder='City'
            value={formData.city}
            onChange={(e) => handleChange("city", e.target.value)}
          />
        </div>

        <div className="inputsreg">
          <img src="" alt=""/>
          <input className='inputreg'
            type="number" 
            placeholder='Phone'
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>

        <div className="inputsreg">
          <img src="" alt=""/>
          <input className='inputreg'
            type="password" 
            placeholder='Password'
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </div>

        <div className="inputsreg">
          <img src="" alt=""/>
          <input className='inputreg'
            type="password" 
            placeholder='Confirm Password'
            value={formData.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
          />
        </div>

        
      </div>
{/* //dont need forgot password for register
      <div className='forgot-password'>Forget Password? <span>Click Here!</span></div>
       */}
      <div className='submit-container'>
        <div className="submit" onClick={handleSubmit}>Sign Up</div>
      </div>
    </div>
  );
}

export default RegisterUser;