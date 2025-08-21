import axios from "axios";
import React, { useState } from "react";
import { URL } from "../constants/api";

const AddBanner = ({ onClose }) => {
  const [bannerType, setBannerType] = useState(""); 
  const [img, setImg] = useState(null);

  const [formData, setFormData] = useState({
    BannerName: "",
    sequence: "",
    isActive: "true",
    BannerTypeDetails: ""
  });

  const [options, setOptions] = useState([]); 
  const [selectedOption, setSelectedOption] = useState(""); 
  const [loadingOptions, setLoadingOptions] = useState(false); 

  // ✅ for handling text/number/select changes (BannerName, sequence, status)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ image upload change
  const handleFileChange = (e) => {
    setImg(e.target.files[0]);
  };

  // ✅ handle type dropdown change → fetch related data
  const handleBannerChange = async (e) => {
    const selected = e.target.value;
    setBannerType(selected);
    setSelectedOption(""); // reset previously selected option
    setOptions([]);
    if (!selected) return;

    try {
      setLoadingOptions(true); 
      let res;
      if (selected === "CategoryListing") {
        res = await axios.get(`${URL}/api_app/get-category`);
        setOptions(res.data.listings); 
      } else if (selected === "SubCategory") {
        res = await axios.get(`${URL}/api_app/get-subcategory`);
        setOptions(res.data.AllSubCategory); 
      } else if (selected === "Listing") {
        res = await axios.get(`${URL}/api_app/get-additional-details`);
        setOptions(res.data.AllAdditionalDetails); 
      }
      console.log(res.data);
    } catch (err) {
      console.error("Error fetching options:", err);
    } finally {
      setLoadingOptions(false); 
    }
  };

  // ✅ helper to get the correct label (this is what we save as BannerTypeDetails)
  const getOptionLabel = (option) => {
    if (bannerType === "CategoryListing") return option.CategoryName;
    if (bannerType === "SubCategory") return option.SubCategoryName;
    if (bannerType === "Listing") return option.Name;
    return "";
  };

  // ✅ single selection → set label (name) as selectedOption
  const handleOptionChange = (label) => {
    setSelectedOption(label);
  };

  // ✅ submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("BannerName", formData.BannerName);
      data.append("sequence", formData.sequence);
      data.append("isActive", formData.isActive);
      data.append("BannerType", bannerType);
      data.append("BannerTypeDetails", selectedOption); // ✅ save label instead of id
      if (img) data.append("myimg", img);

      const res = await axios.post(`${URL}/api_admin/add-banners`, data);
      console.log("Banner added:", res.data);
      onClose();
    } catch (err) {
      console.error("Error saving banner:", err);
    }
  };

  return (
    <div className="inset-0 border-2 fixed z-50 bg-black/50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-[60rem] h-min-[35rem] mx-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Banner</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-600 hover:text-red-600 text-xl font-bold mb-4"
          >
            ×
          </button>
        </div>

        {/* Banner Name */}
        <div className="pb-3">
          <label className="block text-sm font-semibold text-blue-900 mb-1">
            Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="BannerName"
            placeholder="Name"
            value={formData.BannerName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md outline-none"
            required
          />
        </div>

        {/* Type Dropdown */}
        <div>
          <label className="block text-sm font-semibold text-blue-900 mb-1">
            Type
          </label>
          <select
            name="bannerType"
            value={bannerType}
            onChange={handleBannerChange}
            className="w-full mb-6 px-4 py-2 border rounded-md"
            required
          >
            <option value="">Select Type</option>
            <option value="CategoryListing">Category</option>
            <option value="SubCategory">Sub-Category</option>
            <option value="Listing">Listings</option>
          </select>
        </div>

        {/* Dynamic options (radio for single select) */}
        {loadingOptions ? (
          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <svg
              className="animate-spin h-5 w-5 text-blue-900"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            Loading {bannerType} options...
          </div>
        ) : (
          options.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-semibold text-blue-900 mb-2">
                Select {bannerType} Option
              </label>
              <div className="grid grid-cols-7 gap-3 max-h-40 overflow-y-auto p-3 rounded">
                {options.map((option, idx) => {
                  const label = getOptionLabel(option);
                  return (
                    <label key={option._id || idx} className="flex items-center gap-2">
                      <input
                        type="radio" // ✅ single selection
                        name="singleOption"
                        checked={selectedOption === label} // ✅ compare with label
                        onChange={() => handleOptionChange(label)} // ✅ save label
                      />
                      {label}
                    </label>
                  );
                })}
              </div>
            </div>
          )
        )}

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-semibold text-blue-900 mb-1">
            Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full mb-4 px-4 py-6 border rounded-md text-center cursor-pointer"
          />
        </div>

        {/* Sequence + Status */}
        <div className="grid grid-cols-2 gap-4">
          <div>
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

        {/* Buttons */}
        <div className="flex justify-between items-center py-7">
          <button
            type="button"
            className="bg-yellow-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-yellow-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-900 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-800"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBanner;
