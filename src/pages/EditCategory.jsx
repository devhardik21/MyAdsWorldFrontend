// EditCategory.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../components/Navbar";
import NavbarHorizontal from "../components/NavbarHorizontal";
import { URL } from "../constants/api";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  

  // Text/boolean states
  const [formData, setFormData] = useState({
    CategoryName: "",
    CategoryDescription: "",
    CatIntro: "",
    CatSequence: "",
    isActive: true,
  });

  // Image states
  const [categoryUrlFile, setCategoryUrlFile] = useState(null);
  const [categoryUrlPreview, setCategoryUrlPreview] = useState("");
  const [categoryIconFile, setCategoryIconFile] = useState(null);
  const [categoryIconPreview, setCategoryIconPreview] = useState("");

  // Fetch category by ID
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`${URL}/api_admin/get-category/${id}`);
        const data = res.data.Cat;

        console.log(data);
        

        setFormData({
          CategoryName: data.CategoryName || "",
          CategoryDescription: data.CategoryDescription || "",
          CatIntro: data.CatIntro || "",
          CatSequence: data.CatSequence || "",
          isActive: data.isActive ?? true,
        });

        setCategoryUrlPreview(data.CategoryUrl);
        setCategoryIconPreview(data.CategoryIcon);
      } catch (err) {
        console.error("Error fetching category:", err);
      }
    };
    fetchCategory();
  }, [id]);

  // Handle text/boolean inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle category image upload
  const handleUrlChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryUrlFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setCategoryUrlPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle icon upload
  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryIconFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setCategoryIconPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();

      // text/boolean
      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key]);
      });

      // images if updated
      if (categoryUrlFile) form.append("CategoryUrl", categoryUrlFile);
      if (categoryIconFile) form.append("CategoryIcon", categoryIconFile);

      await axios.put(`http://localhost:5000/api/categories/${id}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Category updated successfully!");
      navigate("/category");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed!");
    }
  };

  return (
    <div className="flex">
      <Navbar />

      <div className="flex-1 bg-zinc-100">
        <NavbarHorizontal name="Edit Category" />

        <div className="px-6 py-6">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-xl rounded-xl p-6 grid grid-cols-2 gap-6"
          >
            {/* LEFT COLUMN: Text fields */}
            <div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Category Name</label>
                <input
                  type="text"
                  name="CategoryName"
                  value={formData.CategoryName}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-medium">Description</label>
                <textarea
                  name="CategoryDescription"
                  value={formData.CategoryDescription}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                  rows="3"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-medium">Intro</label>
                <input
                  type="text"
                  name="CatIntro"
                  value={formData.CatIntro}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-medium">Sequence</label>
                <input
                  type="number"
                  name="CatSequence"
                  value={formData.CatSequence}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                />
              </div>

              <div className="mb-4 flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                />
                <label className="font-medium">Active</label>
              </div>

              <button
                type="submit"
                className="bg-yellow-400 text-blue-900 font-bold py-2 px-6 rounded-lg shadow-md"
              >
                Save Changes
              </button>
            </div>

            {/* RIGHT COLUMN: Image uploads */}
            <div className="flex flex-col gap-6">
              <div className="border rounded-lg p-4 shadow-md">
                <label className="block mb-2 font-medium">Category Image</label>
                <input type="file" accept="image/*" onChange={handleUrlChange} />
                {categoryUrlPreview && (
                  <img
                    src={categoryUrlPreview}
                    alt="Category Preview"
                    className="mt-2 h-32 w-full object-cover rounded-lg"
                  />
                )}
              </div>

              <div className="border rounded-lg p-4 shadow-md">
                <label className="block mb-2 font-medium">Category Icon</label>
                <input type="file" accept="image/*" onChange={handleIconChange} />
                {categoryIconPreview && (
                  <img
                    src={categoryIconPreview}
                    alt="Icon Preview"
                    className="mt-2 h-20 w-20 object-cover rounded-lg"
                  />
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
