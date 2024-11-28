import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import './Navbar.css'

const Navbar = () => {
  const [menu, setMenu] = useState("home");

  return (
    <div className='navbar'>
      <Link to="/home">
        <img src={assets.Logofull} alt="Logo" className="logo" />
      </Link>
      <button>サインアップ</button>
    </div>
  )
}

export default Navbar
