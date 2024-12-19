import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'; // Nhúng file CSS
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
console.log("API URL:", API_URL);



const SignUp = () => {
    const navigate = useNavigate();
    const [displayName, setDisplayName] = useState(''); // Tên hiển thị
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [dob, setDob] = useState(''); // Ngày sinh
    const [gender, setGender] = useState(''); // Giới tính
    const [phone, setPhone] = useState(''); // Số điện thoại

    const handleDisplayNameChange = (e) => setDisplayName(e.target.value); // Tên hiển thị
    const handleUsernameChange = (e) => setName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
    const handleDobChange = (e) => setDob(e.target.value); // Xử lý thay đổi ngày sinh
    const handleGenderChange = (e) => setGender(e.target.value); // Xử lý thay đổi giới tính
    const handlePhoneChange = (e) => setPhone(e.target.value); // Số điện thoại

   

    const handleSubmit = async (e) => {
        e.preventDefault();    // Debug URL API

        // if (password != confirmPassword) {
        //     alert("Mật khẩu và xác nhận mật khẩu không khớp");
        //     return;
        // }
    
        try {
            const response = await axios.post(`http://localhost:9002/auth/register`, {
                name: name,
                email: email,
                password: password,
            });
            
              
            console.log("Response từ API:", response); // Debug response
            if (response && response.data) {
                navigate('/login');
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
        }
    };
    
    return (
        <div className="signup"> {/* Lớp cha là 'signup' */}
            <div className="signup-container">
                <div className="signup-form">
                    <div className="logo">
                        <img src={assets.Logofull} alt="Logo" />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <img src={assets.user_icon} alt="user-icon" />
                            <input
                                type="text"
                                placeholder="ログイン名"
                                value={displayName}
                                onChange={handleDisplayNameChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <img src={assets.Name} />
                            <input
                                type="text"
                                placeholder="表示名"
                                value={name}
                                onChange={handleUsernameChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <img src={assets.Mail} />
                            <input
                                type="email"
                                placeholder="電子メール"
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <img src={assets.Key} />
                            <input
                                type="text"
                                placeholder="パスワード"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <img src={assets.Key} />
                            <input
                                type="password"
                                placeholder="パスワードを再入力してください"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <img src={assets.Calendar} />
                            <input
                                type="date"
                                placeholder="生年月日"
                                value={dob}
                                onMouseDown={(e) => {
                                    e.preventDefault(); // Ngăn mặc định để lịch không bị ẩn
                                    e.target.showPicker(); // Buộc hiển thị lịch
                                }}
                                onChange={handleDobChange}
                                required
                            />
                        </div>
                        <div className="input-group gender-group">
                            <img src={assets.Gender} />
                            <select value={gender} onChange={handleGenderChange} required>
                                <option value="">性別を選択</option>
                                <option value="male">男性</option>
                                <option value="female">女性</option>
                                <option value="other">その他</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <img src={assets.Phone} />
                            <input
                                type="tel"
                                placeholder="電話番号"
                                value={phone}
                                onChange={handlePhoneChange}
                                required
                            />
                        </div>
                        <button type="submit" className="signup-btn" >サインアップ</button>
                    </form>
                    <div className="account-link">
                        <p>新しいアカウントを作成？ <a href="/login">ログイン</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
