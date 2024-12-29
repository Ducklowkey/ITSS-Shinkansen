import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import useAuth từ context
import { assets } from '../../assets/assets';
import './login.css'; // Nhúng file CSS
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL; // Sử dụng biến môi trường

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Trạng thái đang xử lý
  const { setIsLoggedIn } = useAuth(); // Lấy hàm setIsLoggedIn từ context
  const navigate = useNavigate(); // Hook để điều hướng
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Hiển thị trạng thái loading

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email: email,
        password: password,
      });

      console.log("Response từ API:", response);

      if (response && response.data) {
        const { token, id, name} = response.data; // Backend trả về token và id thay vì user_id

        if (id && name) {
          localStorage.setItem('token', token); // Lưu token vào localStorage
          localStorage.setItem('user_id', id); // Lưu id (tương đương user_id) vào localStorage
          localStorage.setItem('user_name', name); 
          setIsLoggedIn(true); // Cập nhật trạng thái đăng nhập
          navigate('/home'); // Chuyển hướng đến trang home
        } else {
          alert("Không có id trong phản hồi từ server.");
        }
      } else {
        alert("Không nhận được dữ liệu từ server");
      }
    } catch (error) {
      console.error("Lỗi xảy ra:", error);

      if (error.response) {
        console.log("Chi tiết lỗi từ server:", error.response.data);
        alert(`Lỗi: ${error.response.data.message || "Server không phản hồi đúng định dạng"}`);
      } else {
        alert("Lỗi: Không thể kết nối tới server");
      }
    } finally {
      setLoading(false); // Tắt trạng thái loading
    }
  };

  return (
    <div className="login">
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
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'ログイン中...' : 'ログイン'}
            </button>
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
