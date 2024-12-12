import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import useAuth từ context
import { assets } from '../../assets/assets';
import './Admin_login.css'; // Nhúng file CSS

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
        <div className="login-form1">
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
            <button type="submit" className="login-btn">ログイン</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
