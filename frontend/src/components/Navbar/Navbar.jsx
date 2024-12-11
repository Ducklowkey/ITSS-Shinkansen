import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { assets } from '../../assets/assets';
import './Navbar.css';

const Navbar = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className='navbar'>
      <Link to="/home">
        <img src={assets.Logofull} alt="Logo" className="logo" />
      </Link>
      {isLoggedIn ? (
        <Link to="/User"> 
          <img src={assets.user1} alt="User Profile" className="profile-pic" />
        </Link>
      ) : (
        <Link to="/login">
          <button>サインアップ</button>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
