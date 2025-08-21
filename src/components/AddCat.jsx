import React, { useState } from "react";

const MenuPage = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    icon: null,
    sequence: "",
    status: "active",
  });

  const [preview, setPreview] = useState({
    icon: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setFormData({ ...formData, [name]: file });

      // Preview file
      setPreview((prev) => ({
        ...prev,
        [name]: URL.createObjectURL(file),
      }));
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
      <div className="relative bg-white p-6 rounded-xl shadow-lg w-[80rem] h-min-[32rem] h-max-auto overflow-y-auto">
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
            <label className="block text-sm font-semibold text-blue-900 mb-1">
              Icon
            </label>
            <div className="w-full mb-4 px-4 py-6 border rounded-md text-center cursor-pointer relative">
              <input
                type="file"
                name="icon"
                accept="image/*"
                onChange={handleChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {preview.icon ? (
                <img
                  src={preview.icon}
                  alt="icon preview"
                  className="mx-auto max-h-24 object-contain"
                />
              ) : (
                <span className="text-gray-400">Click to upload Icon</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Sequence */}
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
                type="button"
                onClick={onClose}
                className="bg-yellow-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-yellow-600"
              >
                Cancel
              </button>
            </div>
            <div>
              <button
                type="submit"
                className="bg-blue-900 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-800"
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
