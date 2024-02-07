import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function Category({ onSelectedData }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const inputRef = useRef(null);

  // Fetch categories from the backend
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get("/categories");
        setCategories(response.data);
        //console.log(response.data);
        if (response.data.length > 0) {
          setSelectedCategory(response.data[0].name);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  // Handler for selecting a category
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setNewCategory("");
    onSelectedData(e.target.value);
  };

  // Handler for adding a new category
  const handleNewCategoryChange = (e) => {
    setNewCategory(e.target.value);
    setSelectedCategory(""); // Clear the selected category
    onSelectedData(e.target.value);
  };

  useEffect(() => {
    if (selectedCategory || newCategory) {
      const selectedValue = selectedCategory || newCategory;
      // console.log("Submitted category:", selectedValue);
      onSelectedData(selectedValue);
    }
  }, [selectedCategory, newCategory, onSelectedData]);

  const handleInputFocus = () => {
    inputRef.current.selectionStart = inputRef.current.selectionEnd;
  };

  return (
    <div className="category">
      {/* Dropdown select for existing categories */}
      <select value={selectedCategory} onChange={handleCategoryChange}>
        {/* <option value="" disabled>
          Select category
        </option> */}
        {categories.map((category) => (
          <option key={category.name} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      {/* Input field for adding a new category */}
      <input
        ref={inputRef}
        placeholder="select or add new category"
        type="text"
        value={newCategory}
        onChange={handleNewCategoryChange}
        onFocus={handleInputFocus}
      />
    </div>
  );
}

export default Category;
