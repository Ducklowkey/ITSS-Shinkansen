import React from 'react'
import { assets } from '../../assets/assets'
import './Search.css'

const Search = () => {
  return (
    <div id="wrapper">
      <div id="header">
        <div id="logo" className="center">
          <img src={assets.logo} alt="" />
          <span>ベトナムの味</span>
        </div>
        <div id="login" className="center">
          <a href="">サインアップ</a>
        </div>
      </div>
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
            <div className="filter-items">
              <div className="filter-title">
                <span className="filter-type">カテゴリー</span>
                <span className="filter-clear">すべてクリア</span>
              </div>
              <div className="filter-options">
                <div className="filter-option filter-active">
                  <span>全て</span>
                </div>
                <div className="filter-option">
                  <span>ブランチ</span>
                </div>
                <div className="filter-option">
                  <span>夕食</span>
                </div>
                <div className="filter-option">
                  <span>ハンバーガー</span>
                </div>
                <div className="filter-option">
                  <span>中華</span>
                </div>
                <div className="filter-option">
                  <span>ピザ</span>
                </div>
                <div className="filter-option">
                  <span>サラダ</span>
                </div>
                <div className="filter-option">
                  <span>スープ</span>
                </div>
                <div className="filter-option">
                    <span>朝食</span>
                </div>
              </div>
            </div>
            <div className="filter-items">
              <div className="filter-title">
                <span className="filter-type">味フィルター</span>
                <span className="filter-clear">すべてクリア</span>
              </div>
              <div className="filter-options">
                <div className="filter-option filter-active">
                  <span>酸味</span>
                </div>
                <div className="filter-option">
                  <span>甘味</span>
                </div>
                <div className="filter-option">
                  <span>苦味</span>
                </div>
                <div className="filter-option">
                  <span>辛味</span>
                </div>
              </div>
            </div>
            <div className="filter-items">
              <div className="filter-title">
                <span className="filter-type">価格帯</span>
                <span className="filter-clear">すべてクリア</span>
              </div>
              <div className="filter-options">
                <div className="filter-option filter-cir">
                  <span>$</span>
                </div>
                <div className="filter-option filter-cir">
                  <span>$$</span>
                </div>
                <div className="filter-option filter-cir filter-active">
                  <span>$$</span>
                </div>
                <div className="filter-option filter-cir">
                  <span>$$$$</span>
                </div>
                <div className="filter-option filter-cir">
                  <span>$$$$</span>
                </div>
              </div>
            </div>
          </div>
          <div id="btn-filter" className="center">
            <button>提出する</button>
          </div>
        </form>
        <div id="list-products">
          {[assets.food5, assets.food5, assets.food5, assets.food5, assets.food5, assets.food5, assets.food5, assets.food5].map((image, index) => (
            <div className="product-item" key={index}>
              <div className="product-img">
                <img src={image} alt="" />
              </div>
              <div className="product-content">
                <span className="price">$ 9.99</span>
                <a href="" className="product-name">卵焼き</a>
                <span className="product-description">卵、レタス、塩、油などで作られています。</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
