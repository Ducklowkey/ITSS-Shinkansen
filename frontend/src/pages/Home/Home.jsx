import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import Axios
import { assets } from '../../assets/assets';
import './Home.css';


const priceOptions = [
  {
    label: '<50k',
    beginPrice: 0,
    endPrice: 50000,
  },
  {
    label: '50-100k',
    beginPrice: 50000,
    endPrice: 100000,
  },
  {
    label: '100-200k',
    beginPrice: 100000,
    endPrice: 200000,
  },
  {
    label: '200-500k',
    beginPrice: 200000,
    endPrice: 500000,
  },
  {
    label: '500-1000k',
    beginPrice: 500000,
    endPrice: 1000000,
  },
  {
    label: '>1000k',
    beginPrice: 1000000,
    endPrice: 999999999,
  },
]


const Home = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTaste, setSelectedTaste] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState();
  const [beginPrice, setBeginPrice] = useState(0);
  const [endPrice, setEndPrice] = useState(999999999);
  const [products, setProducts] = useState([]); // State cho danh sách món ăn
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Trạng thái lỗi
  const navigate = useNavigate(); // Khởi tạo useNavigate
  const searchTimeoutRef = useRef(null); 
  // Gọi API để lấy danh sách món ăn
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:9002/posts/filter'); 
        console.log('API Response:', response);
        setProducts(response.data); // Cập nhật danh sách món ăn
        console.log(response.data);
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

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search keyword:', e.target.keyword.value);
    const searchParams = new URLSearchParams();
    searchParams.append('search', e.target.keyword.value);
    const searchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:9002/posts/filter?${searchParams.toString()}`);
        console.log('API Response:', response);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
        setLoading(false);
      }
    };
    searchProducts();
  }

  const handleOnChangeSearch = (e) => {
    const searchTerm = e.target.value;
     if (searchTimeoutRef.current) {
          clearTimeout(searchTimeoutRef.current);
     }
      searchTimeoutRef.current = setTimeout(async () => {
            try {
              if(searchTerm === '') {
                  const response = await axios.get('http://localhost:9002/posts/filter');
                  setProducts(response.data);
              } else {
                  const response = await axios.get(`http://localhost:9002/posts/filter?search=${searchTerm}`);
                  setProducts(response.data);
              }
            } catch (error) {
              console.error('Error fetching products:', error);
            }
          }, 500); // 500ms delay
  }

  const handleSubmitFilter = () => {
    console.log('Selected Categories:', selectedCategories);
    console.log('Selected Taste:', selectedTaste);
    const filterParams = new URLSearchParams();
    selectedCategories.forEach((category) => filterParams.append('categoryId', category));
    selectedTaste.forEach((taste) => filterParams.append('flavor', taste));
    filterParams.append('beginPrice', beginPrice);
    filterParams.append('endPrice', endPrice);
    // selectedPrices.forEach((price) => filterParams.append('price', price));
    const filterProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:9002/posts/filter?${filterParams.toString()}`);
        console.log('API Response:', response);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
        setLoading(false);
      }
    };
    filterProducts();
  }

  return (
    <div id="wrapper">
      <div id="content">
        <div id="search-keyword">
          <form action="" className="center" onSubmit={handleSearch}>
            <input type="text" placeholder="キーワードを入力して" name='keyword' onChange={handleOnChangeSearch}/>
            <button>
              <img src={assets.Search2} alt="Search Icon" className="search-full-icon" />
            </button>
          </form>
        </div>
        <div id="filter">
          <h3 className="filter-header">
            フィルター <i className="fa-solid fa-magnifying-glass"></i>
            <img src={assets.Search1} alt="Search Icon" className="search-icon" />
          </h3>

          <div id="list-filter">
                  <div className="filter-items">
                    <div className="filter-title">
                    <span className="filter-type">カテゴリー</span>
                    <span className="filter-clear" onClick={() => setSelectedCategories([])}>すべてクリア</span>
                    </div>
                    <div className="filter-options">
                    {['軽食', '朝食', '昼食', '夕食', 'デザート'].map((category, index) => (
                      <div
                      className={`filter-option ${selectedCategories.includes(index + 1) ? 'filter-active' : ''}`}
                      key={index + 1}
                      onClick={() => toggleFilter(selectedCategories, setSelectedCategories, index + 1)}
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
                <span className="filter-clear" 
                  onClick={() => {
                    setSelectedPrice()
                    setBeginPrice(0)
                    setEndPrice(999999999)
                  }}
                >
                  クリア
                  </span>
              </div>
              <div className="filter-options">
                {priceOptions.map((price,index) => (
                  <div
                    className={`filter-option ${price == selectedPrice ? 'filter-active' : ''}`}
                    key={index}
                    onClick={() => {
                      setSelectedPrice(price)
                      setBeginPrice(price.beginPrice)
                      setEndPrice(price.endPrice)
                    }}
                  >
                    <span>{price.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div id="btn-filter" className="center">
            <button
              type="button"
              onClick={handleSubmitFilter}
            >
              提出する
            </button>
          </div>
        </div>
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
                  <span className="price">{product.price} VND</span>
                  <a href="#" className="product-name">{product.name}</a>
                  <span style={{marginTop: '3px'}}>({product.name_jp})</span>
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
