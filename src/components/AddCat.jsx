import React, { useState } from "react";

const MenuPage = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    subTitle: "",
    icon: null,
    image: null,
    category: "",
    sequence: "",
    status: "active",
  });

  const categories = ["Plumbing", "Cleaning", "Electrician", "Painter"];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    onClose(); // close modal after submit if you want
  };

  return (
    //  Fullscreen overlay
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 border-2">
      {/* Modal box */}
      <div className="relative bg-white p-6  rounded-xl shadow-lg w-[80rem]  h-[32rem] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={() => onClose()}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-600 text-xl font-bold"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-blue-900 mb-4">Category</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-4 py-2">
            {/* Category Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-1">
                Category<span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-1">
                Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md outline-none"
                required
              />
            </div>
          </div>

          {/* Icon Upload */}
          <div>
            <label className="block text-sm font-semibold text-blue-900 ">
              Icon
            </label>
            <input
              type="file"
              name="icon"
              accept="image/*"
              onChange={handleChange}
              className="w-full mb-4 px-4 py-6 border rounded-md text-center cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              {/* Sequence */}
              <label className="block text-sm font-semibold text-blue-900 mb-1">
                Sequence
              </label>
              <input
                type="number"
                name="sequence"
                placeholder="Sequence"
                value={formData.sequence}
                onChange={handleChange}
                className="w-full mb-4 px-4 py-2 border rounded-md outline-none"
              />
            </div>
            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          
            <div className="flex items-center justify-between p-8">
              <div>
                {/* Cancel */}
                <button
                  type="Cancel"
                  className="bg-yellow-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-yellow-500 "
                >
                  Cancel
                </button>
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-blue-900 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-800 "
                >
                  Submit
                </button>
              </div>
            </div>
          
        </form>
      </div>
    </div>
  );
};

export default MenuPage;
