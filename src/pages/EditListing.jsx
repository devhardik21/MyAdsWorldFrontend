import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import NavbarHorizontal from "../components/NavbarHorizontal";
import { LocalURL, URL as API_URL } from "../constants/api";

const EditListing = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // text states
    const [formData, setFormData] = useState({
        Name: "",
        PhoneNumber: "",
        Email: "",
        Address: "",
        AboutUs: "",
        isOpen: true,
        Category: "",
    });

    // image states
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState("");

    // fetch business by ID
    useEffect(() => {
        const fetchBusiness = async () => {
            try {
                const res = await axios.get(`${API_URL}/api_admin/get-listing/${id}`);
                const data = res.data.Company;

                setFormData({
                    Name: data.Name || "",
                    PhoneNumber: data.PhoneNumber || "",
                    Email: data.Email || "",
                    Address: data.Address || "",
                    AboutUs: data.AboutUs || "",
                    isOpen: data.isOpen ?? true,
                    Category: data.Category || "",
                });

                setPreviewImage(data.ImageUrl || "");
            } catch (err) {
                console.error("Error fetching business:", err);
            }
        };
        fetchBusiness();
    }, [id]);

    // handle inputs
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // handle image upload
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    // submit update
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const form = new FormData();

            // text/boolean
            Object.keys(formData).forEach((key) => {
                form.append(key, formData[key]);
            });

            // image if updated
            if (imageFile) form.append("ImageUrl", imageFile);

            await axios.put(`${API_URL}/api_admin/update-listing/${id}`, form);

            alert("Business updated successfully!");
            navigate("/listing");
        } catch (err) {
            console.error("Update failed:", err);
            alert("Update failed!");
        }
    };

    return (
        <div className="flex">
            <Navbar />

            <div className="flex-1 bg-zinc-100">
                <NavbarHorizontal name="Edit Business" />

                <div className="px-6 py-6">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white shadow-xl rounded-xl p-6 grid grid-cols-2 gap-6"
                    >
                        {/* LEFT COLUMN: text fields */}
                        <div>
                            <div className="mb-4">
                                <label className="block mb-1 font-medium">Business Name</label>
                                <input
                                    type="text"
                                    name="Name"
                                    value={formData.Name}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-2"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-1 font-medium">Phone Number</label>
                                <input
                                    type="text"
                                    name="PhoneNumber"
                                    value={formData.PhoneNumber}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-2"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-1 font-medium">Email</label>
                                <input
                                    type="email"
                                    name="Email"
                                    value={formData.Email}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-2"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-1 font-medium">Address</label>
                                <input
                                    type="text"
                                    name="Address"
                                    value={formData.Address}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-2"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-1 font-medium">About Us</label>
                                <textarea
                                    name="AboutUs"
                                    value={formData.AboutUs}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-2"
                                    rows="3"
                                />
                            </div>

                            <div className="mb-4 flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="isOpen"
                                    checked={formData.isOpen}
                                    onChange={handleChange}
                                />
                                <label className="font-medium">Open</label>
                            </div>

                            <button
                                type="submit"
                                className="bg-yellow-400 text-blue-900 font-bold py-2 px-6 rounded-lg shadow-md"
                            >
                                Save Changes
                            </button>
                        </div>

                        {/* RIGHT COLUMN: image upload */}
                        <div className="border rounded-lg p-4 shadow-md">
                            <label className="block mb-2 font-medium">Business Image</label>
                            <input type="file" accept="image/*" onChange={handleFileChange} />
                            {previewImage && (
                                <img
                                    src={previewImage}
                                    alt="Business Preview"
                                    className="mt-2 h-40 w-full object-cover rounded-lg"
                                />
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditListing;
