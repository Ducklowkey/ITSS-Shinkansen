import React, { useState } from "react";
import "./Foods.css";

const Foods = () => {
  const initialFoodItems = [
    { id: 1, name: "Lorem Ipsum 1", date: "April 9, 2022", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { id: 2, name: "Lorem Ipsum 2", date: "April 9, 2022", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { id: 3, name: "Lorem Ipsum 3", date: "April 9, 2022", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  ];

  const [foodItems, setFoodItems] = useState(initialFoodItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [editItem, setEditItem] = useState(null);
  const [editInput, setEditInput] = useState({ name: "", date: "", description: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter foods based on search query
  const filteredFoods = foodItems.filter((food) =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Open edit modal
  const handleEditClick = (item) => {
    setEditItem(item.id);
    setEditInput({ ...item });
    setIsModalOpen(true);
  };

  // Save the edited data
  const handleEditSave = () => {
    setFoodItems((prev) =>
      prev.map((food) => (food.id === editItem ? { ...food, ...editInput } : food))
    );
    setIsModalOpen(false);
    setEditItem(null);
  };

  // Cancel the editing process
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditItem(null);
  };

  // Delete a food item
  const handleDeleteClick = (id) => {
    setFoodItems((prev) => prev.filter((food) => food.id !== id));
  };

  return (
    <div className="foods-container">
      <h1>Foods</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search foods"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="food-list-container">
        <h2>List of Foods</h2>
        <div className="food-list">
          {filteredFoods.map((item) => (
            <div key={item.id} className="food-item">
              <div className="food-details">
                <h3>{item.name}</h3>
                <p>{item.date}</p>
                <p>{item.description}</p>
              </div>
              <div className="food-actions">
                <button className="edit-btn" onClick={() => handleEditClick(item)}>
                  ✏️
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteClick(item.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Food</h2>
            <label>
              Name:
              <input
                type="text"
                value={editInput.name}
                onChange={(e) => setEditInput({ ...editInput, name: e.target.value })}
              />
            </label>
            <label>
              Date:
              <input
                type="text"
                value={editInput.date}
                onChange={(e) => setEditInput({ ...editInput, date: e.target.value })}
              />
            </label>
            <label>
              Description:
              <textarea
                value={editInput.description}
                onChange={(e) =>
                  setEditInput({ ...editInput, description: e.target.value })
                }
              ></textarea>
            </label>
            <div className="modal-actions">
              <button onClick={handleEditSave} className="save-btn">
                Save
              </button>
              <button onClick={handleCloseModal} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Foods;
