import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import Axios
import { assets } from '../../assets/assets';
import './Home.css';

const Home = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTaste, setSelectedTaste] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [products, setProducts] = useState([]); // State cho danh sách món ăn
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Trạng thái lỗi
  const navigate = useNavigate(); // Khởi tạo useNavigate

  // Gọi API để lấy danh sách món ăn
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:9002/posts/filter'); // Thay URL phù hợp
        console.log('API Response:', response);
        setProducts(response.data); // Cập nhật danh sách món ăn
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
              <img src={assets.Search2} alt="Search Icon" className="search-full-icon" />
            </button>
          </form>
        </div>
        <form id="filter">
          <h3 className="filter-header">
            フィルター <i className="fa-solid fa-magnifying-glass"></i>
            <img src={assets.Search1} alt="Search Icon" className="search-icon" />
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
          {loading && <p>データを読み込んでいます...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && products.length === 0 && <p>商品が見つかりません。</p>}
          {!loading &&
            !error &&
            products.map((product) => (
              <div
                className="product-item"
                key={product.id}
                onClick={() => handleItemClick(product.id)}
              >
                <div className="product-img">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-content">
                  <span className="price">${product.price}</span>
                  <a href="#" className="product-name">{product.name}</a>
                  <span className="product-description">{product.description}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
