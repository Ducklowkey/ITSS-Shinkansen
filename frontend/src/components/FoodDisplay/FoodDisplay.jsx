import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate từ react-router-dom
import './FoodDisplay.css'; 
import { assets } from '../../assets/assets';

const FoodDisplay = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate(); // Khai báo useNavigate

  const categories = ['All', 'Breakfast', 'Main Dishes', 'Drinks', 'Desserts'];

  const foods = [
    { id: 1, name: 'Fried Eggs', category: 'Breakfast', price: '$9.99', img: assets.food1 },
    { id: 2, name: 'Pasta', category: 'Main Dishes', price: '$14.99', img: assets.food2 },
    { id: 3, name: 'Coffee', category: 'Drinks', price: '$4.99', img: assets.food3 },
    { id: 4, name: 'Cake', category: 'Desserts', price: '$7.99', img: assets.food4 },
  ];

  const filteredFoods = selectedCategory === 'All'
    ? foods
    : foods.filter((food) => food.category === selectedCategory);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // Xử lý khi nhấn vào món ăn
  const handleFoodClick = (foodId) => {
    navigate(`/dish?id=${foodId}`); // Sử dụng navigate để chuyển hướng đến trang chi tiết món ăn
  };

  return (
    <div className="food-display">
      <div className="categoriesButton">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={selectedCategory === category ? 'active' : ''}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="listFood">
        {filteredFoods.map((food) => (
          <div
            key={food.id}
            className="food-item"
            onClick={() => handleFoodClick(food.id)} // Thêm xử lý click vào món ăn
          >
            <img src={food.img} alt={food.name} className="food-img" />
            <p className="price">{food.price}</p>
            <p className="foodName">{food.name}</p>
            <p className="desc">This is a delicious {food.category}.</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
