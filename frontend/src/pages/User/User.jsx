import React from 'react'
import './User.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
const User = () => {
    return (
    
    <div className="container">
      <header className="header-user">
        <img
          src={assets.header_user}// Thay bằng ảnh header của bạn
          alt="Header"
          className="header-image"
        />
        <div className="header-buttons">
          {/* Thêm 2 nút ở đây */}
          <Link to="/user" className="header-btn">
            情報
          </Link>
          <Link to="/favorite" className="header-btn">
            お気に入りリスト
          </Link>
        </div>
      </header>
      <main className="profile">
        <div className="profile-info">
          <img
            src={assets.user1} // Thay bằng ảnh đại diện của bạn
            alt="Avatar"
            className="avatar"
          />
          <div>
            <h2 className="profile-name">久俊日</h2>
            <p className="profile-email">kudo.shinichi@gmail.com</p>
          </div>
          <button className="edit-button">編集</button>
        </div>

        <div className="form">
          <div className="form-row">
            <div className="form-group">
              <label>名</label>
              <input type="text" placeholder="あなたの名前" />
            </div>
            <div className="form-group">
              <label>姓</label>
              <input type="text" placeholder="あなたの苗字" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>性別</label>
              <input type="text" placeholder="性別を入力" />
            </div>
            <div className="form-group">
              <label>国</label>
              <input type="text" placeholder="国を入力" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>言語</label>
              <input type="text" placeholder="日本語" disabled />
            </div>
            <div className="form-group">
              <label>タイムゾーン</label>
              <input type="text" placeholder="GMT+7" />
            </div>
          </div>
        </div>

        <div className="email-section">
          <h3>私のメールアドレス</h3>
          <div className="email-info">
            <span className="email-icon">📧</span>
            <p className="email-text">kudo.shinichi@gmail.com</p>
           
          </div>
          <button className="add-email">+ メールアドレスを追加</button>
        </div>
      </main>
    </div>
  );
}


export default User
