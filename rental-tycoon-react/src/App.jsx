import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from './pages/Home';
import AddRent from './pages/AddRent';
import '../src/App.css';
import CreateMachine from './pages/CreateMachine';
import ProductPage from './pages/ProductPage'
import NavBar from "./NavBar";
import Catalog from "./pages/Catalog";
import RentPage from "./pages/RentPage";
import Register from "./pages/RegisterUser";
import LogIn from "./pages/LogIn";


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
              <ul><a href="/Login">Login</a></ul>
            </li>
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
              <Route path="/register" element={<Register/>}/>
              <Route path="/logIn" element={<LogIn/>}/>
            </Routes>
          </div>
        </Router>
        <div className="footer"></div>
      </div>
    </>
  )
}

export default App
