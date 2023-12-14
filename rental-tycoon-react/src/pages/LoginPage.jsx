import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginService from "../services/LoginService";
import Message from "../components/Message";

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
    
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
         await LoginService.login(email, password); 
         navigate('/')
      } catch (error) {
          setMessage({ isSuccess: false, text: "Something went wrong, Try again!" });
          console.error(error);
      }
    };
  
    return (
      <div className="form-signInForm">
        <form onSubmit={handleLogin}>
          <h3>Login</h3>
          <div>
            <label>Email Address:</label>
            <input
              type="email"
              placeholder='Email Address'
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              placeholder='Password'
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit">Login</button>
          <div>
              {message && (
                  <Message isSuccess={message.isSuccess} message={message.text} />
              )}
          </div>
        </form>
      </div>
    );
  };
  
  export default Login; 