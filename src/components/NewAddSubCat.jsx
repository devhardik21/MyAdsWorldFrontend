import axios from "axios";
import React, { useEffect, useState } from "react";
import { LocalURL, URL } from "../constants/api";
// { SubCategoryName, CategoryName, SubCatSequence, isActive }
const NewSubCatAddPage = ({ onClose }) => {
  const [img, setImg] = useState(null);
  const [CategoryName, setCategoryName] = useState(null);
  const [CatList, setCatList] = useState({});
  const [formData, setFormData] = useState({
    SubCategoryName: "",
    SubCatSequence: "",
    isActive: "true",
  });

  useEffect(() => {
    const FetchCategories  = async ()=> {
        try {
            const response = await axios(`${URL}/api_app/get-category`) ;
            setCatList(response.data) ;
        } catch (error) {
          console.log("failed to make the data of category");  
        }
    }

    FetchCategories() ; 
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

  };

  const handleCategoryChange = (e) => {
    setCategoryName(e.target.value);
  }
  const handleImageChange = (e) => {
    setImg(e.target.files[0]);

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("SubCategoryName", formData.SubCategoryName);
      data.append("SubCatSequence", formData.SubCatSequence);
      data.append("isActive", formData.isActive);
      data.append("CategoryName", CategoryName);
      data.append("myimg", img);
      const response = await axios.post(`${URL}/api_admin/add-subcategory`, data);

      console.log(response.data.message);


    } catch (error) {
      console.log("there was an error fetching the api ");

    }
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
                value={CategoryName}
                onChange={handleCategoryChange}
                required
                className="w-full px-4 py-2 border rounded-md"
              >
                <option value="" disabled>
                  Select Category
                </option>
                {CatList.listings?.map((cat, idx) => (
                  <option key={idx} value={cat.CategoryName}>
                    {cat.CategoryName}
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
                name="SubCategoryName"
                placeholder="Name"
                value={formData.SubCategoryName}
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
              onChange={handleImageChange}
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
                name="SubCatSequence"
                placeholder="Sequence"
                value={formData.SubCatSequence}
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
                name=""
                value={formData.isActive}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
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

export default NewSubCatAddPage;
