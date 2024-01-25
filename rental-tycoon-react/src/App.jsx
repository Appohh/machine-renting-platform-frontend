import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from './pages/Home';
import AddRent from './pages/AddRent';
import '../src/App.css';
import CreateMachine from './pages/CreateMachine';
import ProductPage from './pages/ProductPage'
import NavBar from "./NavBar";
import Catalog from "./pages/Catalog";
import RentPage from "./pages/RentPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RentHistory from "./pages/RentHistory";
import RegisterUser from "./pages/RegisterUser";
import CartComponent from "./components/Cart/CartComponent";
import RentDetails from "./pages/RentDetails";
import ConfirmPage from "./pages/ConfirmPage";
import AboutPage from "./pages/AboutPage";


function App() {
  return (
    <>
      <div className='main-wrap'>
        <Router>
          <CartComponent />
          <div className='nav'>
            <NavBar />
          </div>
          <div className='content'>
            <Routes>
              <Route path="/Login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterUser />} />
              <Route path="/" element={<Home />} />
              <Route path="/addRent" element={<AddRent />} />
              <Route path="/addMachine" element={<CreateMachine />} />
              <Route path="/ProductPage/:productId" element={<ProductPage />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/rentpage" element={<RentPage />} />
              <Route path="/ProfilePage" element={<ProfilePage />} />
              <Route path="/History/:userId" element={<RentHistory />} />
              <Route path="/RentDetails" element={<RentDetails />} />
              <Route path="/Success" element={<ConfirmPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </div>
        </Router>
        <div className="footer">
           {/* make this to be placed on the right side */}
           <div className="footer_home">
           <ul><a href="/">Home</a></ul>
          <ul><a href="/catalog">Catalog</a></ul>  
           </div>

           <div className="footer_contact">
         <h3>Contact Us</h3>
            <p>Phone: 1234567</p>
            <p>Email: Rental.Tycoon@gmail.com</p>
            <p>© 2024 Rental tycoon. All rights reserved.</p>
            </div>
        </div>

        
      

      </div>
    </>
  )
}

export default App
