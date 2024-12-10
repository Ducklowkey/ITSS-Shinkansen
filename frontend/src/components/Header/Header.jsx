import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Header.css'

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
                  <button onClick={handleSearch}>検索</button>
                </div>
                <button>サインイン</button>
                <button>サインアップ</button>
            </div>
        </div>
  )
}

export default Header
