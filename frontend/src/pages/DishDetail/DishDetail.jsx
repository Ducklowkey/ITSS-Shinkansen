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
  const [selectedStars, setSelectedStars] = useState(0);
  const [similarDish, setSimilarDish] = useState();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const dishId = queryParams.get('id');
  const user_id = localStorage.getItem('user_id');
  const user_name = localStorage.getItem('user_name');  // Thêm user_name nếu có lưu trong localStorage


  const fetchReviews = async () => {
    if (!dishId) return;

    try {
      const response = await axios.get(`http://localhost:9002/posts/comment/${dishId}`);
      setReviews(response.data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  useEffect(() => {
    const fetchDishDetail = async () => {
      if (!dishId) return;

      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:9002/posts/${dishId}`);
        setDish(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dish details:', err);
        setError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
        setLoading(false);
      }
    };

    const japaneseDish = async () => {
      try {
        const response = await axios.get(`http://localhost:9002/posts/sameCourse/${dishId}`);
        console.log(response.data);
        setSimilarDish(response.data);
      } catch (err) {
        console.error('Error fetching dish details:', err);
        setError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
      }
    };

    const checkFavorite = async () => {
      try {
        const response = await axios.get(`http://localhost:9002/posts/liked/${user_id}`);
        const isFavoriteDish = response.data.some(favoriteDish => favoriteDish.id === Number(dishId));
        setIsFavorite(isFavoriteDish);
        setLoading(false); // Tắt trạng thái loading
      } catch (err) {
        console.error('Error fetching favorite dishes:', err);
        setError('Có lỗi xảy ra khi tải danh sách món yêu thích. Vui lòng thử lại sau.');
        setLoading(false);
      }
    };





    fetchDishDetail();
    fetchReviews();
    japaneseDish();
    checkFavorite();
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
    console.log(isFavorite);
    if(isFavorite) {
      const response = await axios.delete(`http://localhost:9002/posts/like`, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: { 
          userId: Number(user_id),  // Thay thế userId với id thực tế (ví dụ: lấy từ localStorage)
          postId: Number(dishId) // Thay thế dishId với postId của món ăn
        }
      });
    } else {
      try {
        const response = await axios.post(`http://localhost:9002/posts/like`, { 
          userId: Number(user_id),
          postId: Number(dishId)
        });
      } catch (error) {
        console.error('Error liking dish:', error);
        alert('Không thể thêm vào danh sách yêu thích. Vui lòng thử lại.');
      }
    }
    setIsFavorite(prevState => !prevState);
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
      fetchReviews();
      setReviewContent('');
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
            <img src={isFavorite ? assets.heart : assets.heartBlank} alt="Favorite" />
            好む
          </button>
          <button className="share-button" onClick={() => navigator.share({
            title: dish.name,
            text: 'Check out this dish!',
            url: window.location.href
          }).catch((err) => console.error('Error sharing:', err))}>
            <img src={assets.shareIcon} alt="Share" />
            シェア
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
              <span className="detail-value">{dish.flavor || 'Chưa có mô tả'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">価格</span>
              <span className="detail-value">{dish.price ? `${dish.price} VND` : 'Không có giá'}</span>
            </div>
          </div>
        </div>
      </div>

        <div className="recipe">
          <h2 className="recipe-name">{dish.making ? 'やり方' : 'Chưa có công thức'}</h2>
          <div>
            <p className="recipe-content">{dish.making ? dish.making.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
            )) : 'Chưa có công thức'}</p>
          </div>
          <div className="ingredient">
            <h3 className="title">材料:</h3>
            <ul className="ingredient-list">
          {dish.materials ? dish.materials.split('\n').map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          )) : 'Chưa có nguyên liệu'}
            </ul>
          </div>
        </div>
        
        {similarDish != null &&
        <div className='similar-dish'>
            <h2>該当日本料理</h2>
            <div>
               <img src={similarDish?.image || assets.food5} alt={similarDish?.name} />
               <div style={{display: 'flex', flexDirection: 'column', textAlign: 'left', width: "500px"}}>
                  <h3 style={{fontSize: '35px'}}>{similarDish.name?similarDish.name:"情報がない"}</h3>
                  <p style={{fontSize: '20px'}}>{similarDish.description?similarDish.description:"情報がない"}</p>
               </div>
            </div>
        </div>
        }

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
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${selectedStars >= star ? 'selected' : ''}`}
                    onClick={() => setSelectedStars(star)}
                  >
                    ★
                  </span>
                ))}
              </div>


            </div>
          </div>
          <button onClick={handleSubmitReview} className="submit-review">Submit</button>
          
          
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
