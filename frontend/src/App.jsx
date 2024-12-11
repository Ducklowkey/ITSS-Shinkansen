import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Landing from './pages/Landing/Landing';
import DishDetail from './pages/DishDetail/DishDetail';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

function App() {
  const location = useLocation(); // Lấy đường dẫn hiện tại

  return (
    <div className="app">
      {/* Ẩn Navbar nếu đang ở đường dẫn "/login" */}
      {location.pathname !== '/login' && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Landing />} />
        <Route path="/dish" element={<DishDetail />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

// Gói App bằng Router để sử dụng useLocation
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
