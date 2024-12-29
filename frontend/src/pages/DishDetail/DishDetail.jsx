import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './DishDetail.css';
import { assets, restaurants } from '../../assets/assets';

const DishDetail = () => {
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [reviewContent, setReviewContent] = useState('');
  const [reviews, setReviews] = useState([]);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const dishId = queryParams.get('id');
  const user_id = localStorage.getItem('user_id');
  const user_name = localStorage.getItem('user_name');  // Thêm user_name nếu có lưu trong localStorage

  useEffect(() => {
    const fetchDishDetail = async () => {
      if (!dishId) return;

      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:9002/posts/${dishId}`);
        setDish(response.data);
        setIsFavorite(response.data.isFavorite || false);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dish details:', err);
        setError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      if (!dishId) return;

      try {
        const response = await axios.get(`http://localhost:9002/posts/comment/${dishId}`);
        setReviews(response.data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    };

    fetchDishDetail();
    fetchReviews();
  }, [dishId]);

  const handleFavoriteClick = async () => {
    if (!user_id || isNaN(user_id)) {
      alert('Bạn cần đăng nhập và userId phải là một số hợp lệ.');
      return;
    }
  
    if (!dishId || isNaN(dishId)) {
      alert('Món ăn không hợp lệ.');
      return;
    }
  
    try {
      const response = await axios.post(`http://localhost:9002/posts/like`, { 
        userId: Number(user_id),
        postId: Number(dishId)
      });

      if (response.status === 200) {
        setIsFavorite(prevState => !prevState);
      }
    } catch (error) {
      console.error('Error liking dish:', error);
      alert('Không thể thêm vào danh sách yêu thích. Vui lòng thử lại.');
    }
  };

  // Gửi review mới
  const handleSubmitReview = async () => {
    if (!reviewContent) {
      alert('Vui lòng nhập nội dung review.');
      return;
    }

    if (!user_id || !user_name) {
      alert('Bạn cần đăng nhập để gửi review.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:9002/posts/comment', {
        userId: Number(user_id),
        userName: user_name,  // Sử dụng tên người dùng từ localStorage
        description: reviewContent,  // Nội dung review
        postId: Number(dishId)
      });

      if (response.status === 200) {
        setReviews(prevReviews => [response.data, ...prevReviews]); // Thêm review mới vào đầu danh sách
        setReviewContent(''); // Xóa nội dung review sau khi gửi
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Không thể gửi review. Vui lòng thử lại.');
    }
  };

  if (loading) {
    return <p>データを読み込んでいます...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!dish) {
    return <p>商品が見つかりません。</p>;
  }

  return (
    <div className="dish-card">
      <div className="dish-container">
      <div className="dish-header">
        <button className="back-button" onClick={() => window.history.back()}>
          <img src={assets.arrow_back} alt="Back" />
        </button>
        <h2 className="dish-name">{dish.name}</h2>
        <div className="action-buttons">
          <button className="favorite-button" onClick={handleFavoriteClick}>
            <img src={isFavorite ? assets.bookmark_filled : assets.bookmark} alt="Favorite" />
          </button>
          <button className="share-button" onClick={() => navigator.share({
            title: dish.name,
            text: 'Check out this dish!',
            url: window.location.href
          }).catch((err) => console.error('Error sharing:', err))}>
            <img src={assets.share_button} alt="Share" />
          </button>
        </div>
      </div>


      <div className="dish-content">
        <div className="dish-image">
          <img src={dish.image || assets.food5} alt={dish.name} />
        </div>

        <div className="dish-info">
          <div className="dish-details">
            <div className="detail-row">
              <span className="detail-label">料理名</span>
              <span className="detail-value">{dish.name}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">説明</span>
              <span className="detail-value">{dish.making || 'Chưa có mô tả'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">価格</span>
              <span className="detail-value">{dish.price ? `${dish.price} VND` : 'Không có giá'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recipe */}
      <div className="recipe">
        <h2 className="recipe-name">{dish.making ? 'Công thức' : 'Chưa có công thức'}</h2>
        <div className="ingredient">
          <h3 className="title">材料:</h3>
          <ul className="ingredient-list">
            {dish.materials ? dish.materials.split(',').map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            )) : 'Chưa có nguyên liệu'}
          </ul>
        </div>
      </div>

      {/* Restaurants */}
      <div className="restaurant">
        <h2 className="res-title">この料理で知られている有名な店</h2>
        <p className="res-description">
          この料理に興味があるなら、以下のレストランで試してみることをためらわないでください。
        </p>
        <div className="res-suggest">
          {restaurants.map((restaurant, index) => (
            <div key={index} className="card">
              <img src={restaurant.image} alt={restaurant.name} />
              <div className="card-content">
                <h3 className="card-title">{restaurant.name}</h3>
                <p className="card-address">Địa chỉ: {restaurant.address}</p>
                <p className="card-hotline">Hotline: {restaurant.hotline}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>

      {/* Reviews */}
      <div className="review-container">
        <div className="add-review">
          <div className="add-review-header">
            <img
              src={assets.user1}
              alt="User Avatar"
              className="user-avatar"
            />
            <div className="review-input">
              <input
                type="text"
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
                placeholder="ここにレビューを追加してください"
                
              />
              <div className="review-stars">
                {[...Array(5)].map((_, index) => (
                  <span key={index} className="star">★</span>
                ))}
              </div>


              <button onClick={handleSubmitReview} className="submit-review">Submit</button>
            </div>
          </div>
          
          
        </div>

        <div className="review-list">
            {/* Hiển thị chỉ 3 bình luận mới nhất */}
            {reviews.slice(-3).map((review, index) => (
              <div key={index} className="review-item">
                <div className="review-header">
                <img
                    src={assets.user1}
                    alt={review.userName}
                    className="review-avatar"
                  />
                  <p className="review-name">{review.userName}</p>
                  <p className="review-date">{review.date}</p>
                  
                </div>
                <p className="review-content">{review.description}</p>
                <div className="review-footer">
                    <div className="review-rating">
                        {[...Array(5)].map((_, index) => (
                        <span key={index} className="star">★</span>
                    ))}
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
};

export default DishDetail;
