
import React, { useState } from "react";

const AddBanner = () => {
  const [formData, setFormData] = useState({
    name: "",
    subTitle: "",
    icon: null,
    image: null,
    category: "",
    sequence: "",
    status: "active",
  });

  

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
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-full  max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Sub-Category</h2>

      {/* Image Upload */}
      <label className="block text-sm font-semibold text-blue-900 mb-1">Image</label>
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        className="w-full mb-4 px-4 py-6 border rounded-md text-center cursor-pointer"
      />

     

      {/* Sequence */}
      <label className="block text-sm font-semibold text-blue-900 mb-1">Sequence</label>
      <input
        type="number"
        name="sequence"
        placeholder="Sequence"
        value={formData.sequence}
        onChange={handleChange}
        className="w-full mb-4 px-4 py-2 border rounded-md outline-none"
      />

      {/* Status Dropdown */}
      <label className="block text-sm font-semibold text-blue-900 mb-1">Status</label>
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full mb-6 px-4 py-2 border rounded-md"
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <button
        type="submit"
        className="bg-blue-900 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-800"
      >
        Save Changes
      </button>
    </form>
  );
};

export default AddBanner;
