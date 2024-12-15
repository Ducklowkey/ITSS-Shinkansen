import React from 'react'
import './DishDetail.css'
import { assets,restaurants,reviews } from '../../assets/assets'

const DishDetail = () => {
    return (
      <div className="dish-card">
      {/* Header với nút Quay lại và nút Yêu thích */}
      <div className="dish-header">
          <button className="back-button" onClick={() => window.history.back()}>
          <img 
                src={assets.arrow_back}
                alt="Back" 
              /> {/* Biểu tượng quay lại */}
          </button>
          <h2 className="dish-name">Bún Chả HaNoi</h2>
          <button className="favorite-button">
          <img 
                src={assets.bookmark}
                alt="favor" 
              /> {/* Biểu tượng yêu thích */}
          </button>
      </div>
          <div className="dish-content">
            <div className="dish-image">
              <img 
                src={assets.food5}
                alt="Bún Chả" 
              />
            </div>
            
            <div className="dish-info">
              <div className="dish-details">
                <div className="detail-row">
                  <span className="detail-label">料理名</span>
                  <span className="detail-value">ブンチャ (Bún Chả)</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">説明</span>
                  <span className="detail-value">
                    バンチャーはハノイの伝統的な料理で、香ばしい焼き豚肉と新鮮なバン、濃厚なタレ、そして生野菜を含む料理です。
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">カテゴリ</span>
                  <span className="detail-value">ブランチ</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">味</span>
                  <span className="detail-value">塩辛い ・ 甘い</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">価格</span>
                  <span className="detail-value">50,000 VND (約250円)</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">評価</span>
                  <span className="detail-value">4.5/5</span>
                </div>
              </div>
            </div>
          </div>

          <div className="recipe">
            <h2 className="recipe-name">味噌汁の作り方</h2>
            <div className="ingredient">
                <h3 className="title">材料:</h3>
                <ul className="ingredient-list">
                    <li>水：500ml</li>
                    <li>出汁：1袋</li>
                    <li>味噌：大さじ2</li>
                    <li>豆腐：1/2丁</li>
                    <li>わかめ：少々</li>
                    <li>ネギ：1本</li>
                </ul>
            </div>
            <div className="HowToDo">
                <h3 className="title">作り方:</h3>
                <ol className="ToDo-list">
                    <li >準備する:</li>
                        <ul className="DotList">
                            <li >豆腐を小さな四角に切ります。</li>
                            <li >わかめをぬるま湯に5分ほど浸して、柔らかくなったら水気を切ります。</li>
                            <li >ネギを小口切りにします。</li>
                        </ul>
                    <li >だしを作る:</li>
                        <ul className="DotList">
                            <li >鍋に500mlの水を入れて沸騰させます。沸騰したら出汁を1袋加えて、よく混ぜ、1〜2分煮ます。</li>
                        </ul>
                    <li >味噌を加える:</li>
                        <ul className="DotList">
                            <li >火を中火に弱め、味噌を大さじ2加えます。味噌が固まらないように、スプーンや味噌こしでしっかり溶かします。</li>
                        </ul>
                    <li >具材を加える:</li>
                        <ul className="DotList">
                            <li >豆腐とわかめを鍋に入れ、1〜2分温めます。豆腐が崩れないように優しく混ぜます。</li>
                        </ul>
                    <li >仕上げ:</li>
                        <ul className="DotList">
                            <li >味噌汁をお椀によそい、小口切りにしたネギを飾って完成です。</li>   
                        </ul>
                </ol>
            </div>
          </div>
        <div>
      
      <div className="video">
        <iframe 
            width="560" // Đặt chiều rộng của video
            height="315" // Đặt chiều cao của video
            src="https://www.youtube.com/embed/SQ1j8WkOUZM?si=xGD7sh9pS2LyvlHd" // Thay bằng URL video YouTube bạn muốn nhúng
            frameBorder="0" // Tùy chọn để không có viền
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" // Các quyền hạn sử dụng
            allowFullScreen // Cho phép xem toàn màn hình
        ></iframe>
      </div>
    </div>


        <div className="restaurant">
            <h2 className="res-title">この料理で知られている有名な店</h2>
            <p className="res-description">この料理に興味があるなら、以下のレストランで試してみることをためらわないでください。</p>
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
   
        <div className="review-container">
            {/* Khu vực thêm đánh giá */}
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
                placeholder="ここにレビューを追加してください"
              />
            </div>
            </div>
            <div className="review-stars">
              {[...Array(5)].map((_, index) => (
                <span key={index} className="star">
                  ★
                </span>
              ))}
            </div>
          </div>


            {/* Danh sách đánh giá */}
            <div className="review-list">
                {reviews.map((review, index) => (
                <div key={index} className="review-item">
                    <div className="review-header">
                      <div className="review-rating">
                      {[...Array(review.rating)].map((_, index) => (
                          <span key={index} className="star filled">
                          ★
                          </span>
                      ))}
                      </div>

                    </div>

                    <p className="review-content">{review.content}</p>

                    <div className="review-footer">
                    <img src={review.avatar} alt={review.name} className="review-avatar" />
                    <p className="review-name">{review.name}</p>
                    <p className="review-date">{review.date}</p>
                          
                      
                    </div>
                </div>
                ))}
            </div>
        </div>
    
    </div>
    
    
    );
}

export default DishDetail
