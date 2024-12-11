import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import useAuth từ context
import { assets } from '../../assets/assets';
import './login.css'; // Nhúng file CSS

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsLoggedIn } = useAuth(); // Lấy hàm setIsLoggedIn từ context
  const navigate = useNavigate(); // Hook để điều hướng

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Đặt trạng thái đăng nhập mà không kiểm tra mật khẩu
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    // Chuyển hướng đến trang home
    navigate('/home');
  };

  return (
    <div className="login"> {/* Lớp cha là 'login' */}
      <div className="login-container">
        <div className="login-form">
          <div className="logo">
            <img src={assets.Logofull} alt="Logo" />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <img src={assets.user_icon} alt="user-icon" />
              <input
                type="email"
                placeholder="メールアドレス／ユーザー名"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="input-group">
              <img src={assets.Password_icon} alt="pass-icon" />
              <input
                type="password"
                placeholder="パスワード"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <a href="/forgot-password" className="forgot-password">パスワードをお忘れの方</a>
            <button type="submit" className="login-btn">ログイン</button>
          </form>
          <div className="social-login-prompt">
            <span></span>
            <p>こちらもご利用いただけます</p>
            <span></span>
          </div>
          <div className="social-login">
            <a href="https://www.facebook.com" className="social-btn">
              <img src={assets.Fb} alt="Facebook" />
            </a>
            <a href="https://www.twitter.com" className="social-btn">
              <img src={assets.Twitter} alt="Twitter" />
            </a>
            <a href="https://www.telegram.org" className="social-btn">
              <img src={assets.Tele} alt="Telegram" />
            </a>
          </div>
          <div className="account-link">
            <p>アカウントが未登録？ <a href="/sign-up">アカウントの作成</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
