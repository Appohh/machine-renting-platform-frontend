import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from './pages/Home';
import AddRent from './pages/AddRent';
import SearchPage from "./pages/SearchPage";
import '../src/App.css';
import CreateMachine from './pages/CreateMachine';
import logo from './assets/react.svg'


function App() {
  return (
    <>
      <div className='main-wrap'>
        <Router>
          <div className='nav'>
            <li>
              <ul><a href="/">Home</a></ul>
              <ul><a href="/">Catalog</a></ul>
              <ul><img src={logo} alt="logo"></img></ul>
              <ul><a href="/">About</a></ul>
              <ul><a href="/">Contact</a></ul>
            </li>
          </div>
          <div className='content'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/addRent" element={<AddRent />} />
              <Route path="/addMachine" element={<CreateMachine />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </div>
        </Router>
        <div className="footer"></div>
      </div>
    </>
  )
}

export default App
