/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AutoLogin } from './redux/actions/account';
import Login from './components/Account/Login';
import Register from './components/Account/Register';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomePage from './components/Home/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import GameNavBar from './components/GameNavBar';
import Footer from './components/Footer';
import GamesList from './components/Shop/GamesList';
import DetailsPage from './components/Shop/DetailsPage';
import WishListPage from './components/WishList/WishListPage';
import CartPage from './components/Cart/CartPage';
import LibraryPage from './components/Library/LibraryPage';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(AutoLogin());
  }, []);

  useEffect(() => {
    const path = location.pathname;

    let pageTitle = "G-PLANET";

    if (path === "/") {
      pageTitle = "Benvenuto su G-PLANET";
    } else if (path === "/login") {
      pageTitle = "Accedi";
    } else if (path.startsWith("/register")) {
      pageTitle = "Registrati";
    }

    document.title = pageTitle;
  }, [location]);

  return (
    <>
      <NavBar />
      <GameNavBar />
      <Routes >

          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<ProtectedRoute children={<Login />} allowedRoles={[null]} />} />
          <Route path="/register" element={<ProtectedRoute children={<Register />} allowedRoles={[null]} />} />
          <Route path="/wishList/:userName" element={<ProtectedRoute children={<WishListPage />} allowedRoles={["User", "Admin"]} />} />
          <Route path="/cart/:userName" element={<ProtectedRoute children={<CartPage />} allowedRoles={["User", "Admin"]} />} />
          <Route path="/library/:userName" element={<ProtectedRoute children={<LibraryPage />} allowedRoles={["User", "Admin"]} />} />
          <Route path="/games" element={<GamesList />} />
          <Route path="/game/:id" element={<DetailsPage />} />

          <Route path="*" element={<HomePage />} />
          
      </Routes>
      <Footer />
    </>
  )
}

export default App
