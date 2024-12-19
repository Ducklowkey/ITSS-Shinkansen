import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import './SignUp.css'; // Nhúng file CSS

const SignUp = () => {
    const [displayName, setDisplayName] = useState(''); // Tên hiển thị
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [dob, setDob] = useState(''); // Ngày sinh
    const [gender, setGender] = useState(''); // Giới tính
    const [phone, setPhone] = useState(''); // Số điện thoại

    const handleDisplayNameChange = (e) => setDisplayName(e.target.value); // Tên hiển thị
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
    const handleDobChange = (e) => setDob(e.target.value); // Xử lý thay đổi ngày sinh
    const handleGenderChange = (e) => setGender(e.target.value); // Xử lý thay đổi giới tính
    const handlePhoneChange = (e) => setPhone(e.target.value); // Số điện thoại

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Display Name:', displayName);
        console.log('Username:', username);
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Confirm Password:', confirmPassword);
        console.log('Date of Birth:', dob);
        console.log('Gender:', gender);
        console.log('Phone:', phone);
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
                                value={username}
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
                            <img src={assets.Password_icon} />
                            <input
                                type="password"
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
                            <select
                                value={gender}
                                onChange={(e) => {
                                    handleGenderChange(e);
                                    e.target.style.color = e.target.value ? 'black' : '#666';
                                }}
                                required
                            >
                                <option value="" disabled hidden>性別を選択</option>
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
                        <button type="submit" className="signup-btn">サインアップ</button>
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
