import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { assets } from '../../assets/assets';
import './Home.css';

const Home = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTaste, setSelectedTaste] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const toggleFilter = (selectedList, setFunction, value) => {
    setFunction((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  // Handle item click
  const handleItemClick = (id) => {
    navigate(`/dish?id=${id}`); // Chuyển hướng đến /dish với query string
  };

  return (
    <div id="wrapper">
      <div id="content">
        <div id="search-keyword">
          <form action="" className="center">
            <input type="text" placeholder="キーワードを入力して" />
            <button>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
        <form id="filter">
          <h3>
            フィルター <i className="fa-solid fa-magnifying-glass"></i>
          </h3>
          <div id="list-filter">
            {/* Category Filter */}
            <div className="filter-items">
              <div className="filter-title">
                <span className="filter-type">カテゴリー</span>
                <span className="filter-clear" onClick={() => setSelectedCategories([])}>すべてクリア</span>
              </div>
              <div className="filter-options">
                {['軽食', '朝食', '昼食', '夕食', 'デザート'].map((category) => (
                  <div
                    className={`filter-option ${selectedCategories.includes(category) ? 'filter-active' : ''}`}
                    key={category}
                    onClick={() => toggleFilter(selectedCategories, setSelectedCategories, category)}
                  >
                    <span>{category}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Taste Filter */}
            <div className="filter-items">
              <div className="filter-title">
                <span className="filter-type">味フィルター</span>
                <span className="filter-clear" onClick={() => setSelectedTaste([])}>すべてクリア</span>
              </div>
              <div className="filter-options">
                {['酸味', '甘味', '苦味', '辛味'].map((taste) => (
                  <div
                    className={`filter-option ${selectedTaste.includes(taste) ? 'filter-active' : ''}`}
                    key={taste}
                    onClick={() => toggleFilter(selectedTaste, setSelectedTaste, taste)}
                  >
                    <span>{taste}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="filter-items">
              <div className="filter-title">
                <span className="filter-type">価格帯</span>
                <span className="filter-clear" onClick={() => setSelectedPrices([])}>すべてクリア</span>
              </div>
              <div className="filter-options">
                {['<50k', '50-100k', '100-200k', '200-500k', '500-1000k', '>1000k'].map((price) => (
                  <div
                    className={`filter-option ${selectedPrices.includes(price) ? 'filter-active' : ''}`}
                    key={price}
                    onClick={() => toggleFilter(selectedPrices, setSelectedPrices, price)}
                  >
                    <span>{price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div id="btn-filter" className="center">
            <button
              type="button"
              onClick={() =>
                console.log({
                  selectedCategories,
                  selectedTaste,
                  selectedPrices,
                })
              }
            >
              提出する
            </button>
          </div>
        </form>
        <div id="list-products">
          {[assets.food1, assets.food2, assets.food3, assets.food5, assets.food5, assets.food5, assets.food5, assets.food4].map((image, index) => (
            <div className="product-item" key={index} onClick={() => handleItemClick(index)}>
              <div className="product-img">
                <img src={image} alt="" />
              </div>
              <div className="product-content">
                <span className="price">$ 9.99</span>
                <a href="#" className="product-name">卵焼き</a>
                <span className="product-description">卵、レタス、塩、油などで作られています。</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
