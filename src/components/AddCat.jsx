import React, { useState } from "react";
import axios from "axios";
import { URL } from "../constants/api.js";
import { LocalURL } from "../constants/api.js";

const MenuPage = ({ onClose }) => {
  const [img, setImg] = useState(null);
  const [formData, setFormData] = useState({
    CategoryName: "",
    isActive: "true",
    CatSequence: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value 
    });
    
    console.log(formData);
  };

  const handleImageChange = (e) => {
      setImg(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("CategoryName", formData.CategoryName);
    data.append("CatSequence", formData.CatSequence);
    data.append("isActive", formData.isActive);
    data.append("myimg", img);

    try {
      const response = await axios.post(`${URL}/api_admin/add-category`, data);
      console.log("Category created:", response.data);
      console.log(response.message);
      
      onClose(); // close modal after success
    } catch (error) {
      console.error("Error creating category:", error);      
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 border-2">
      <div className="relative bg-white p-6 rounded-xl shadow-lg w-[80rem] h-[32rem] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-600 text-xl font-bold"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-blue-900 mb-4">Category</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-4 py-2">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-1">
                Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="CategoryName"
                placeholder="Name"
                value={formData.CategoryName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md outline-none"
                required
              />
            </div>
          </div>

          {/* Icon Upload */}
          <div>
            <label className="block text-sm font-semibold text-blue-900">Icon</label>
            <input
              type="file"
              name="myimg"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full mb-4 px-4 py-6 border rounded-md text-center cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Sequence */}
            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-1">Sequence</label>
              <input
                type="number"
                name="CatSequence"
                placeholder="Sequence"
                value={formData.CatSequence}
                onChange={handleChange}
                className="w-full mb-4 px-4 py-2 border rounded-md outline-none"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-1">Status</label>
              <select
                name="isActive"
                value={formData.isActive}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between p-8">
            <button
              type="button"
              onClick={onClose}
              className="bg-yellow-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-yellow-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-900 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuPage;
