/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import ProfilePage from './components/Profile/ProfilePage';
import ProfileSettings from './components/Profile/ProfileSettings';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const userName = useSelector(state => state.profile.userName);
  const selectedGame = useSelector(state => state.selectedGame);

  useEffect(() => {
    dispatch(AutoLogin());
  }, []);

  useEffect(() => {
    const path = location.pathname;

    let pageTitle;

    if (!userName && !selectedGame) return;

    switch (true) {
      case path === "/":
        pageTitle = "Benvenuto su G-PLANET";
        break;

      case path === "/login":
        pageTitle = "Accedi";
        break;

      case path === "/register":
        pageTitle = "Registrati";
        break;

      case path === "/profile":
        pageTitle = `Profilo :: ${userName.toUpperCase()}`;
        break;

      case path === "/profile/settings":
        pageTitle = `Impostazione profilo :: ${userName.toUpperCase()}`;
        break;

      case path === "/games":
        pageTitle = "Cerca su G-PLANET";
        break;

      case /^\/game\/\w+/.test(path):
        pageTitle = `${selectedGame} :: G-PLANET`
        break;

      case /^\/library\/\w+/.test(path):
        pageTitle = `Libreria di ${userName.toUpperCase()}`;
        break;

      case /^\/wishList\/\w+/.test(path):
        pageTitle = `Lista desideri di ${userName.toUpperCase()}`;
        break;

      case /^\/cart\/\w+/.test(path):
        pageTitle = `Carrello di ${userName.toUpperCase()}`;
        break;

      default:
        pageTitle = "G-PLANET";
        break;
    }

    document.title = pageTitle;
  }, [location, userName, selectedGame]);

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
        <Route path="/profile" element={<ProtectedRoute children={<ProfilePage />} allowedRoles={["User", "Admin"]} />} />
        <Route path="/profile/settings" element={<ProtectedRoute children={<ProfileSettings />} allowedRoles={["User", "Admin"]} />} />
        <Route path="/games" element={<GamesList />} />
        <Route path="/game/:id" element={<DetailsPage />} />

        <Route path="*" element={<HomePage />} />

      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        transition={Bounce}
        theme="dark"
      />
      <Footer />
    </>
  )
}

export default App;
