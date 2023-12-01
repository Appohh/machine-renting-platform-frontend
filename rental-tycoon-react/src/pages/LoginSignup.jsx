import React, { useState } from 'react'
import './LoginSignup.css'



export const LoginSignup = () => {

const[action,setAction] = useState("Sign up")

  return (
    <div className='container'>
        <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
            <div className="input">
                <img src="" alt=""/>
                <input type="text" placeholder='Username'/>
            </div>

            <div className="input">
                <img src="" alt=""/>
                <input type="email" placeholder='Example@gmail.com'/>
            </div>

            <div className="input">
                <img src="" alt=""/>
                <input type="password" placeholder='Password'/>
            </div>
        </div>
        <div className='forgot-password'>Forget Password? <span>Click Here!</span>     </div>
        <div className='submit-container'></div>
        <div className={action==="Login"?"submit gray":"submit"}onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
        <div className={action==="Sign up"?"submit gray":"submit"}onClick={()=>{setAction("Login")}}>Login</div>
    </div>
    
  )
}
