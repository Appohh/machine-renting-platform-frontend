import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from './pages/Home';
import AddRent from './pages/AddRent';
import SearchPage from "./pages/SearchPAGE";
import '../src/App.css';
import CreateMachine from './pages/CreateMachine';


function App() {
  return (
    <>
      <div className='main-wrap'>
        <Router>
          <div className='nav'></div>
          <div className='content'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/addRent" element={<AddRent />} />
              <Route path="/addMachine" element={<CreateMachine/>} />
              <Route path="/search" element={<SearchPage/>}/>
            </Routes>
          </div>
        </Router>
        <div className="footer"></div>
      </div>
    </>
  )
}

export default App
