import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import useAuth từ context
import { assets } from '../../assets/assets';
import './login.css'; // Nhúng file CSS
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsLoggedIn } = useAuth(); // Lấy hàm setIsLoggedIn từ context
  const navigate = useNavigate(); // Hook để điều hướng

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Gửi thông tin email và password đến API login
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });
  

      if (response.status === 200) {
        const { token } = response.data; // Backend trả về token
        localStorage.setItem('token', token); // Lưu token vào localStorage
        setIsLoggedIn(true); // Cập nhật trạng thái đăng nhập
        navigate('/home'); // Chuyển hướng đến trang home
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      alert('Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập.');
    }
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
