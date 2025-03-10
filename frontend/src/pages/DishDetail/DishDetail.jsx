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
  const [averageRate, setAverageRate] = useState(5);
  const queryParams = new URLSearchParams(location.search);
  const dishId = queryParams.get('id');
  const user_id = localStorage.getItem('user_id');
  const user_name = localStorage.getItem('user_name');  // Thêm user_name nếu có lưu trong localStorage
  const flavorTypes = ['甘味', '辛い ', '酸味', '苦い','塩辛い'];
  
  const fetchReviews = async () => {
    if (!dishId) return;

    try {
      const response = await axios.get(`http://localhost:9002/posts/comment/${dishId}`);
      setReviews(response.data);
      console.log(response.data);
      const totalRate = response.data.reduce((acc, review) => acc + review.rate, 0);
      const average = (totalRate / response.data.length).toFixed(1);
      setAverageRate(average);
      console.log(average);
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
        setSimilarDish(response.data);
      } catch (err) {
        console.error('Error fetching dish details:', err);
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
  
    if (selectedStars === 0) {
      alert('Vui lòng chọn số sao.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:9002/posts/comment', {
        userId: Number(user_id),
        userName: user_name, // Sử dụng tên người dùng từ localStorage
        description: reviewContent, // Nội dung review
        postId: Number(dishId),
        rate: selectedStars // Gửi số sao đã chọn
      });
        // Tạo đối tượng review mới để thêm ngay lập tức
        const newReview = {
          userName: user_name,
          description: reviewContent,
          rate: selectedStars,
          date: new Date().toLocaleString() // Lấy ngày giờ hiện tại
        };
  
        // Cập nhật danh sách review ngay lập tức
        setReviews(prevReviews => [newReview, ...prevReviews]);
  
        // Reset input và sao sau khi gửi
        setReviewContent('');
        setSelectedStars(0);
  
        // Cuộn tới vị trí comment
        document.querySelector('.review-list').scrollIntoView({ behavior: 'smooth' });
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
              <span className="detail-value" style={{fontWeight: 600}}>{dish.name_jp}</span>
            </div>
            <div className="detail-row" style={{alignItems: 'flex-start'}}>
              <span className="detail-label">味説明</span>
              <span className="detail-value">{dish.flavorDetail || 'Chưa có mô tả'}<span className='flavor-tag'>{flavorTypes[dish.flavorId - 1]}</span></span>
            </div>
            <div className="detail-row">
              <span className="detail-label">価格</span>
              <span className="detail-value">{dish.price ? `${dish.price} ドン` : 'Không có giá'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">評価</span>
              <span className="detail-value">{averageRate != "NaN" ? averageRate : 5} <span style={{color: "#f3c623"}}>★</span></span>
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
            <h2 style={{fontSize: '30px'}}>日本料理の類似</h2>
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
            <div key={index} className="card" style={{cursor: "pointer"}} onClick={() => window.open(restaurant.link, '_blank')}>
              <img src={restaurant.image} alt={restaurant.name} />
              <div className="card-content">
                <h3 className="card-title">{restaurant.name}</h3>
                <p className="card-address">住所: {restaurant.address}</p>
                <p className="card-hotline">電話番号: {restaurant.hotline}</p>
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
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
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

              <button onClick={handleSubmitReview} className="submit-review">Submit</button>
              </div>
            </div>
          </div>
          
          
        </div>

        <div className="review-list">
            {/* Hiển thị chỉ 3 bình luận mới nhất */}
            {reviews.slice(-5).map((review, index) => (
              <div key={index} className="review-item">
                <div className="review-header">
                <img
                    src={assets.user_icon}
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
                    <span
                      key={index}  className={`star ${index < review.rate ? 'filled' : 'empty'}`}
                    >
                      ★
                    </span>
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
