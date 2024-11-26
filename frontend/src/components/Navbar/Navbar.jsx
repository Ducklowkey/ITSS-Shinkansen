import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import './Navbar.css'

const Navbar = () => {
  const [menu, setMenu] = useState("home");

  return (
    <div className='navbar'>
      <img src={assets.Logofull} alt="Logo" className="logo" />
      <ul className='navbar-menu'>
        <li className={menu === "home" ? "active" : ""}>
          <Link to="/" onClick={() => setMenu("home")}>ホーム</Link>
        </li>
        <li className={menu === "store" ? "active" : ""}>
          <Link to="/store" onClick={() => setMenu("store")}>当店</Link>
        </li>
        <li className={menu === "menu" ? "active" : ""}>
          <Link to="/menu" onClick={() => setMenu("menu")}>メニュー</Link>
        </li>
        <li className={menu === "page" ? "active" : ""}>
          <Link to="/page" onClick={() => setMenu("page")}>ページ</Link>
        </li>
        <li className={menu === "contact" ? "active" : ""}>
          <Link to="/contact" onClick={() => setMenu("contact")}>コンタクト</Link>
        </li>
      </ul>
      <button>サインアップ</button>
    </div>
  )
}

export default Navbar
