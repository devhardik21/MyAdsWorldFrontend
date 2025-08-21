import axios from "axios";
import React, { useState } from "react";
import { LocalURL, URL } from "../constants/api";
// {Name,Description,TypeofFeature} 
const AddFeature = ({ onClose,onCreate}) => {
  const [TypeofFeature, setTypeofFeature] = useState("");
  const [formData, setFormData] = useState({
    Name: "",
    isActive: "true",
    sequence: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleTypeChange = (e) => {
    setTypeofFeature(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(`${URL}/api_admin/create-feature`, {
      ...formData,
      TypeofFeature,
    });
    console.log(response.data.message);
    onClose() ;
    onCreate() ;
  };

  return (
    <div className="flex justify-center items-center inset-0 fixed bg-black/50 z-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-[80rem] h-[23rem]  mx-auto"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Features</h2>
          <button
            onClick={() => onClose()}
            className=" text-gray-600 hover:text-red-600 text-xl font-bold mb-4"
          >
            ×
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-1">
              Type<span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={TypeofFeature}
              onChange={handleTypeChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="" disabled>
                Select Type
              </option>
              <option value="CategoryListing">Category</option>
              <option value="SubCategory">SubCategory</option>
              <option value="Listing">Listing</option>
            </select>
          </div>

          <div>
            {/* Name */}
            <label className="block text-sm font-semibold text-blue-900 mb-1">
              Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="Name"
              placeholder="Name"
              value={formData.Name}
              onChange={handleChange}
              className="w-full mb-4 px-4 py-2 border rounded-md outline-none"
              required
            />
          </div>
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
          <div>
            {/* Status Dropdown */}
            <label className="block text-sm font-semibold text-blue-900 mb-1">
              Status
            </label>
            <select
              name="isActive"
              value={formData.isActive}
              onChange={handleChange}
              className="w-full mb-6 px-4 py-2 border rounded-md"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between items-center py-7">
          <div>
            <button
              onClick={onClose}
              className="bg-yellow-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-yellow-500"
            >
              Cancel
            </button>
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-900 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-800"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddFeature;
