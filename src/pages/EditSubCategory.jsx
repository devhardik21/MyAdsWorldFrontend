import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { LocalURL, URL as API_URL } from "../constants/api";
import NavbarHorizontal from "../components/NavbarHorizontal";
import { Navbar } from "../components/Navbar";

const EditSubCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // text/boolean states
  const [formData, setFormData] = useState({
    SubCategoryName: "",
    SubCategoryDescription: "",
    SubCatIntro: "",
    SubCatSequence: "",
    isActive: true,
  });

  // image states
  const [subCatUrlFile, setSubCatUrlFile] = useState(null);
  const [subCatUrlPreview, setSubCatUrlPreview] = useState("");
  const [subCatIconFile, setSubCatIconFile] = useState(null);
  const [subCatIconPreview, setSubCatIconPreview] = useState("");

  useEffect(() => {
    const fetchSubCategory = async () => {
      try {
        const res = await axios.get(`${API_URL}/api_admin/get-subcategory/${id}`);
        const data = res.data.SubCat;

        setFormData({
          SubCategoryName: data.SubCategoryName || "",
          SubCategoryDescription: data.SubCategoryDescription || "",
          SubCatIntro: data.SubCatIntro || "",
          SubCatSequence: data.SubCatSequence || "",
          isActive: data.isActive ?? true,
        });

        setSubCatUrlPreview(data.SubCategoryUrl);
        setSubCatIconPreview(data.SubCategoryIcon);
      } catch (err) {
        console.error("Error fetching subcategory:", err);
      }
    };
    fetchSubCategory();
  }, [id]);

  // handle text/boolean
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // handle banner upload
  const handleUrlChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSubCatUrlFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setSubCatUrlPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // handle icon upload
  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSubCatIconFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setSubCatIconPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();

      // text/boolean
      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key]);
      });

      // images if updated
      if (subCatUrlFile) form.append("SubCategoryUrl", subCatUrlFile);
      if (subCatIconFile) form.append("SubCategoryIcon", subCatIconFile);

      await axios.put(`${API_URL}/api_admin/update-subcategory/${id}`, form);

      alert("SubCategory updated successfully!");
      navigate("/subcategory");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed!");
    }
  };

  return (
    <div className="flex">
      <Navbar />

      <div className="flex-1 bg-zinc-100">
        <NavbarHorizontal name="Edit SubCategory" />

        <div className="px-6 py-6">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-xl rounded-xl p-6 grid grid-cols-2 gap-6"
          >
            {/* LEFT COLUMN: Text fields */}
            <div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">
                  SubCategory Name
                </label>
                <input
                  type="text"
                  name="SubCategoryName"
                  value={formData.SubCategoryName}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-medium">Description</label>
                <textarea
                  name="SubCategoryDescription"
                  value={formData.SubCategoryDescription}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                  rows="3"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-medium">Intro</label>
                <input
                  type="text"
                  name="SubCatIntro"
                  value={formData.SubCatIntro}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-medium">Sequence</label>
                <input
                  type="number"
                  name="SubCatSequence"
                  value={formData.SubCatSequence}
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
                <label className="block mb-2 font-medium">SubCategory Image</label>
                <input type="file" accept="image/*" onChange={handleUrlChange} />
                {subCatUrlPreview && (
                  <img
                    src={subCatUrlPreview}
                    alt="SubCategory Preview"
                    className="mt-2 h-32 w-full object-cover rounded-lg"
                  />
                )}
              </div>

              <div className="border rounded-lg p-4 shadow-md">
                <label className="block mb-2 font-medium">SubCategory Icon</label>
                <input type="file" accept="image/*" onChange={handleIconChange} />
                {subCatIconPreview && (
                  <img
                    src={subCatIconPreview}
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

export default EditSubCategory;
