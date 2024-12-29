import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Landing from './pages/Landing/Landing';
import DishDetail from './pages/DishDetail/DishDetail';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import User from './pages/User/User';
import Favorite from './pages/Favorite/Favorite';
import SignUp from './pages/SignUp/SignUp';
import Admin_login from './pages/Admin_login/Admin_login';
import Food_List from './pages/admin_Foods/Foods';


const App = () => {
  const location = useLocation(); // Lấy đường dẫn hiện tại

  return (
    <div className="app">
      {/* Ẩn Navbar nếu đang ở đường dẫn "/login" hoặc "/sign-up" */}
      {!['/login', '/sign-up'].includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin_login" element={<Admin_login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dish" element={<DishDetail />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/admin_food" element={<Food_List />} />
      </Routes>
    </div>
  );
};

// Gói App bằng Router để sử dụng useLocation
const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
