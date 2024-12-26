import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import './Favorite.css'; // Bạn có thể tạo file CSS riêng

const API_URL = import.meta.env.VITE_API_URL; // Biến môi trường cho API URL

const Favorite = () => {
  // Lấy user_id từ localStorage và chuyển đổi thành số
  const user_id = Number(localStorage.getItem('user_id')); // Chuyển đổi thành số
  const [favorites, setFavorites] = useState([]); // Danh sách món yêu thích
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi
  const navigate = useNavigate(); // Hook để điều hướng


  useEffect(() => {
    if (!user_id) {
      setError("Vui lòng đăng nhập để xem món yêu thích."); // Hiển thị thông báo lỗi nếu không có user_id
      setLoading(false); // Tắt trạng thái loading
      return;
    }

    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`${API_URL}/posts/liked/${user_id}`);
        setFavorites(response.data); // Lưu danh sách món yêu thích vào state
        setLoading(false); // Tắt trạng thái loading
      } catch (err) {
        console.error('Error fetching favorite dishes:', err);
        setError('Có lỗi xảy ra khi tải danh sách món yêu thích. Vui lòng thử lại sau.');
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user_id]);

  if (loading) {
    return <p>データを読み込んでいます...</p>; // Hiển thị khi đang tải
  }

  if (error) {
    return <p>{error}</p>; // Hiển thị khi có lỗi
  }

  if (favorites.length === 0) {
    return <p>お気に入りの料理はありません。</p>; // Hiển thị nếu không có món yêu thích
  }

  // Hàm xử lý khi người dùng muốn xoá món khỏi danh sách yêu thích
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
              <p>{dish.making || 'Chưa có mô tả'}</p>
              <p>{dish.price ? `${dish.price} VND` : 'Không có giá'}</p>
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
  );
};

export default Favorite;
