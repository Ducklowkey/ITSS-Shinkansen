import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { assets } from '../../assets/assets';
import './Navbar.css';

const Navbar = () => {
  const {isLoggedIn}  = useAuth();
  const userName = localStorage.getItem('user_name')


  return (
    <div className='navbar'>
      <Link to="/home">
        <img src={assets.Logofull} alt="Logo" className="logo" />
      </Link>
      {isLoggedIn ? (

      <div className="user-info">
      <span className="username">Xin chào, {userName}</span> {/* Display username */}
      <Link to="/User"> 
        <img src={assets.user1} alt="User Profile" className="profile-pic" />
      </Link>
    </div>
      ) : (
        <Link to="/login">
          <button>サインアップ</button>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
