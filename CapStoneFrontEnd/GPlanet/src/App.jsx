/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

function App() {


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AutoLogin());
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<ProtectedRoute children ={<Login />} allowedRoles={[null]} />} />
        <Route path="/register" element={<ProtectedRoute children ={<Register />} allowedRoles={[null]} />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
