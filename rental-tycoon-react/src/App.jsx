import { useState } from 'react'; 
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from './pages/Home';
import AddRent from './pages/AddRent';
import '../src/App.css';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='main-wrap'>
        <Router>
          <div className='nav'></div>
          <div className='content'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/AddRent" element={<AddRent />} />
            </Routes>
          </div>
        </Router>
        <div className="footer"></div>
      </div>
    </>
  )
}

export default App
