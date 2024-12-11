import React from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets'; // Nhập assets

const Header = () => {
  const navigate = useNavigate(); // Tạo hook điều hướng

  const handleSearch = () => {
    navigate("/home"); // Điều hướng đến trang /home
  };
  return (
        <div className="header">
            <div className="header-contents">
                <h2>ベトナムの味</h2>
                <p>温かく居心地の良い料理の楽園で、魅力的な料理と忘れられない瞬間を発見してください。</p>
                <div className="search-container">
                  <input type="text" placeholder="検索..." />
                  <button className="search-btn" onClick={handleSearch}>
                    <img src={assets.Search} alt="search-icon" />
                  </button>
                </div>
            </div>
        </div>
  )
}

export default Header
