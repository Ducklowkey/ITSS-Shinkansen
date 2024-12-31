import React, { useEffect, useState } from 'react'
import './User.css';
import { assets } from '../../assets/assets';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const user_id = Number(localStorage.getItem('user_id'));

const User = () => {
    const username = localStorage.getItem('user_name');
    const userEmail = localStorage.getItem('user_email');
    const [tab, setTab] = useState(1);
    const [favorites, setFavorites] = useState([]);
     const [loading, setLoading] = useState(true);
    const renderFavorite = () => {
      const fetchFavorites = async () => {
        try {
          const response = await axios.get(`${API_URL}/posts/liked/${user_id}`);
          console.log(response.data);
          setFavorites(response.data); // Lưu danh sách món yêu thích vào state
          localStorage.setItem('favorites', JSON.stringify(response.data.map(dish => dish.id)));
          setLoading(false); // Tắt trạng thái loading
        } catch (err) {
          console.error('Error fetching favorite dishes:', err);
          setLoading(false);
        }
      };
  
      fetchFavorites();
      setTab(2);
    }

    useEffect(() => {
      document.body.style.backgroundColor = '#474747';

      return () => {
        document.body.style.backgroundColor = null;
      }
    },[]);

    const handleRemoveFavorite = async (dishId) => {
      try {
        // Gửi yêu cầu DELETE với dữ liệu trong body
        const response = await axios.delete(`${API_URL}/posts/like`, {
          headers: {
            'Content-Type': 'application/json',
          },
          data: { 
            userId: user_id,  // Thay thế userId với id thực tế (ví dụ: lấy từ localStorage)
            postId: dishId // Thay thế dishId với postId của món ăn
          }
        });
    
        // Xoá món khỏi danh sách yêu thích sau khi yêu cầu thành công
        setFavorites(favorites.filter(fav => fav.id !== dishId)); 
        console.log('Successfully removed the dish from favorites');
      } catch (err) {
        console.error('Error removing favorite:', err);
        alert('Không thể xóa món yêu thích');
      }
    };

    return (
    <div className="container" style={{marginTop: '20px'}}>
      <header className="header-user">
        <img
          src={assets.header_user}// Thay bằng ảnh header của bạn
          alt="Header"
          className="header-image"
        />
        <div className="header-buttons">
          {/* Thêm 2 nút ở đây */}
                <button to="/user" className={`header-btn ${tab === 1 ? 'active-header' : ''}`} onClick={() => setTab(1)}>
                情報
                </button>
                <button to="/favorite" className={`header-btn ${tab === 2 ? 'active-header' : ''}`} onClick={renderFavorite}>
                お気に入りリスト
                </button>
              </div>
              </header>
              {tab == 1 && <main className="profile">
              <div className="profile-info">
                <img
                src={assets.user1} // Thay bằng ảnh đại diện của bạn
            alt="Avatar"
            className="avatar"
          />
          <div>
            <h2 className="profile-name">{username}</h2>
            <p className="profile-email">kudo.shinichi@gmail.com</p>
          </div>
          <button className="edit-button">編集</button>
        </div>

        <div className="form">
          <div className="form-row">
            <div className="form-group">
              <label>名</label>
              <input type="text" placeholder="あなたの名前" value={username}/>
            </div>
            <div className="form-group">
              <label>姓</label>
              <input type="text" placeholder="あなたの苗字" value={"Nguyen"}/>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>性別</label>
              <input type="text" placeholder="性別を入力" value={"男"}/>
            </div>
            <div className="form-group">
              <label>国</label>
              <input type="text" placeholder="国を入力" value={"ベトナム"}/>
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
      }

      {tab == 2 &&
         <div className="favorite-page">
            <h1 className="favorite-title">お気に入りの料理</h1>
            <div className="favorite-list">
              {favorites.map((dish, index) => (
                <div key={index} className="favorite-item">
                  <div className="favorite-item-image">
                    <img src={dish.image || assets.food5} alt={dish.name} />
                  </div>
                  <div className="favorite-item-info">
                    <h3>{dish.name}</h3>
                    <h4>{dish.price ? `${dish.price} VND` : 'Không có giá'}</h4>
                    <p>{dish.making || 'Chưa có mô tả'}</p>
                  </div>
                  <button
                    className="remove-favorite-btn"
                    onClick={() => handleRemoveFavorite(dish.id)}
                  >
                    削除
                  </button>
                </div>
              ))}
            </div>
          </div>
        }
    </div>
  );
}


export default User
