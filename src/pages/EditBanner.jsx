import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import NavbarHorizontal from "../components/NavbarHorizontal";
import { Navbar } from "../components/Navbar";
import { URL } from "../constants/api";

const EditBanner = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // form states
  const [formData, setFormData] = useState({
    BannerName: "",
    BannerCategory: "",
    sequence: "",
    isActive: true,
  });

  // image state
  const [bannerImage, setBannerImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  // fetch banner details
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await axios.get(`${URL}/api_admin/get-banner/${id}`);
        const data = res.data.BannerbyID;

        setFormData({
          BannerName: data.BannerName || "",
          BannerCategory: data.BannerCategory || "",
          sequence: data.sequence || "",
          isActive: data.isActive ?? true,
        });
        setPreviewUrl(data.BannerUrl || "");
      } catch (error) {
        console.error("Error fetching banner:", error);
      }
    };

    fetchBanner();
  }, [id]);

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle checkbox
  const handleCheckbox = () => {
    setFormData((prev) => ({
      ...prev,
      isActive: !prev.isActive,
    }));
  };

  // handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateData = new FormData();
      updateData.append("BannerName", formData.BannerName);
      updateData.append("BannerCategory", formData.BannerCategory);
      updateData.append("sequence", formData.sequence);
      updateData.append("isActive", formData.isActive);
      if (bannerImage) updateData.append("BannerUrl", bannerImage);

      await axios.put(`${URL}/banner/${id}`, updateData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/banners"); // go back after update
    } catch (error) {
      console.error("Error updating banner:", error);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Navbar></Navbar>

      <div className="flex-1 flex flex-col">
        <NavbarHorizontal name="Edit Banner"></NavbarHorizontal>
        {/* Page Content */}
        <div className="p-6 bg-zinc-100">

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-6 bg-white p-6 rounded-2xl shadow-md"
          >
            {/* Banner Name */}
            <div>
              <label className="block text-gray-700">Banner Name</label>
              <input
                type="text"
                name="BannerName"
                value={formData.BannerName}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-lg p-2"
              />
            </div>

            {/* Banner Category */}
            <div>
              <label className="block text-gray-700">Banner Category</label>
              <input
                type="text"
                name="BannerCategory"
                value={formData.BannerCategory}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-lg p-2"
              />
            </div>

            {/* Sequence */}
            <div>
              <label className="block text-gray-700">Sequence</label>
              <input
                type="number"
                name="sequence"
                value={formData.sequence}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-lg p-2"
              />
            </div>

            {/* Is Active */}
            <div className="flex items-center space-x-2 mt-6">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={handleCheckbox}
              />
              <span>Active</span>
            </div>

            {/* Banner Image */}
            <div className="col-span-2">
              <label className="block text-gray-700">Banner Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2"
              />
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="mt-4 h-40 rounded-xl object-cover border"
                />
              )}
            </div>

            {/* Submit */}
            <div className="col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Update Banner
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBanner;
