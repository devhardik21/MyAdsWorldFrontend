
import React, { useState } from "react";

const AddSubCatPage = ({onClose}) => {
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
    };

    return (
        <div className="inset-0 border-2 fixed z-50 bg-black/50 flex items-center justify-center">

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg mx-auto h-[90vh] h-max-auto overflow-y-auto scrollbar-hide">
                <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Sub-Category</h2>
                <button
                    onClick={() => onClose()}
                    className=" text-gray-600 hover:text-red-600 text-xl font-bold mb-4"
                >
                    ×
                </button>
                </div>
                {/* Name */}
                <label className="block text-sm font-semibold text-blue-900 mb-1">
                    Name<span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full mb-4 px-4 py-2 border rounded-md outline-none"
                    required
                />

                {/* Sub Title */}
                <label className="block text-sm font-semibold text-blue-900 mb-1">
                    Sub Title<span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="subTitle"
                    placeholder="Sub Title"
                    value={formData.subTitle}
                    onChange={handleChange}
                    className="w-full mb-4 px-4 py-2 border rounded-md outline-none"
                    required
                />

                {/* Icon Upload */}
                <label className="block text-sm font-semibold text-blue-900 mb-1">Icon</label>
                <input
                    type="file"
                    name="icon"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full mb-4 px-4 py-6 border rounded-md text-center cursor-pointer"
                />

                {/* Image Upload */}
                <label className="block text-sm font-semibold text-blue-900 mb-1">Image</label>
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full mb-4 px-4 py-6 border rounded-md text-center cursor-pointer"
                />

                {/* Category Dropdown */}
                <label className="block text-sm font-semibold text-blue-900 mb-1">
                    Category<span className="text-red-500">*</span>
                </label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full mb-4 px-4 py-2 border rounded-md"
                >
                    <option value="" disabled>Select Category</option>
                    {categories.map((cat, idx) => (
                        <option key={idx} value={cat}>{cat}</option>
                    ))}
                </select>

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
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddSubCatPage;
