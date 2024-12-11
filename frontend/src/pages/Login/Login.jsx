import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import './login.css'; // Nhúng file CSS

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="login"> {/* Lớp cha là 'login' */}
      <div className="login-container">
        <div className="login-form">
          <div className="logo">
            <img src={assets.Logofull} alt="Logo" />
            <h2>ベトナムの味</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <i className="fa-solid fa-user icon"></i>
              <input 
                type="email" 
                placeholder="メールまたはユーザー名"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="input-group">
              <i className="fa-solid fa-lock icon"></i>
              <input 
                type="password" 
                placeholder="パスワード"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <button type="submit" className="login-btn">ログイン</button>
          </form>
          <div className="social-login">
            <button className="social-btn">Facebook</button>
            <button className="social-btn">Twitter</button>
            <button className="social-btn">Telegram</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
