import React from 'react'
import './LoginSignup.css'

import user_icon from '../assets/images/user_icon.jpg'
import email_icon from '../assets/images/email_icon.jpg'
import password_icon from '../assets/images/password_icon.jpg'


export const LoginSignup = () => {
  return (
    <div className='container'>
        <div className="header">
            <div className="text">Sign Up</div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
            <div className="input">
                <img src={user_icon} alt=""/>
                <input type="text"/>
            </div>

            <div className="input">
                <img src={email_icon} alt=""/>
                <input type="email"/>
            </div>

            <div className="input">
                <img src={password_icon} alt=""/>
                <input type="password"/>
            </div>
        </div>
        <div className='forgot-password'>Forget Password? <span>Click Here!</span>     </div>
        <div className='submit-container'></div>
        <div className='submit'>Sign Up</div>
        <div className='submit'>Login</div>
    </div>
    
  )
}
