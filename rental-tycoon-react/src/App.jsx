import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import {useEffect } from "react";
import Home from './pages/Home';
import AddRent from './pages/AddRent';
import '../src/App.css';
import CreateMachine from './pages/CreateMachine';
import ProductPage from './pages/ProductPage'
import logo from './assets/react.svg'
import CategoryService from "./services/CategoryService";
import Catalog from "./pages/Catalog";
import RentPage from "./pages/RentPage";


function App() {
  
  useEffect(() => {
    CategoryService.getCategories().then(response => console.log("Found categories: ", response))
     
  })

  return (
    <>
      <div className='main-wrap'>
        <Router>
          <div className='nav'>
            <li>
              <ul><a href="/">Home</a></ul>
              <ul><a href="/catalog">Catalog</a></ul>
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
              <Route path="/ProductPage/:productId" element={<ProductPage />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/rentpage" element={<RentPage />} />
            </Routes>
          </div>
        </Router>
        <div className="footer"></div>
      </div>
    </>
  )
}

export default App
