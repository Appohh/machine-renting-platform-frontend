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
import UpdateProfilePage from "./pages/UpdateProfilePage";


function App() {
  return (
    <>
      <div className='main-wrap'>
        <Router>
          <div className='nav'>
            <NavBar/>
          </div>
          <div className='content'>
            <Routes>
              <Route path="/Login" element={<LoginPage/>} />
              <Route path="/" element={<Home />} />
              <Route path="/addRent" element={<AddRent />} />
              <Route path="/addMachine" element={<CreateMachine />} />
              <Route path="/ProductPage/:productId" element={<ProductPage />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/rentpage" element={<RentPage />} />
              <Route path="/ProfilePage" element={<ProfilePage />}/>
              <Route path="/UpdateProfilePage" element={<UpdateProfilePage />}/>
            </Routes>
          </div>
        </Router>
        <div className="footer"></div>
      </div>
    </>
  )
}

export default App
