import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL } from "../constants/api";

const AdditionalFeatureDetails = ({ onClose, DBid,onCreate }) => {

    const [options, setOptions] = useState([]);
    const [formData, setFormData] = useState({});
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        const FetchFeatureData = async () => {
            try {
                // Get feature details
                const DetailResp = await axios.get(`${URL}/api_admin/get-feature/${DBid}`);
                setFormData(DetailResp.data.feature);

                let url;
                let resp;

                if (DetailResp.data.feature.TypeofFeature === "CategoryListing") {
                    url = `${URL}/api_app/get-category`;
                    resp = await axios.get(url);

                    setOptions(
                        resp.data.listings.map((item) => ({
                            id: item._id,
                            label: item.CategoryName,
                        }))
                    );
                }

                if (DetailResp.data.feature.TypeofFeature === "SubCategory") {
                    url = `${URL}/api_app/get-subcategory`;
                    resp = await axios.get(url);

                    setOptions(
                        resp.data.AllSubCategory.map((item) => ({
                            id: item._id,
                            label: item.SubCategoryName,
                        }))
                    );
                }

                if (DetailResp.data.feature.TypeofFeature === "Listing") {
                    url = `${URL}/api_app/get-additional-details`;
                    resp = await axios.get(url);

                    setOptions(
                        resp.data.AllAdditionalDetails.map((item) => ({
                            id: item._id,
                            label: item.Name,
                        }))
                    );
                }
            
            console.log(options);
            
            
            } catch (error) {
                console.log("Error fetching feature data:", error.message);
            }
        };

        FetchFeatureData();
    }, [DBid]);

    const handleCheckboxChange = (optionId) => {
        setSelectedOptions((prev) =>
            prev.includes(optionId)
                ? prev.filter((id) => id !== optionId)
                : [...prev, optionId]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let Items = selectedOptions ; 
            const response = await axios.put(
                `${URL}/api_admin/update-featureItem/${DBid}`,
                 {Items} // sending normalized ids only
            )
            console.log(selectedOptions);
            
            console.log("12345");
            console.log(response.data);
            console.log(response.data.message);
            onCreate()
            onClose();
        } catch (error) {
            console.log("we got an error making the put request", error.message);
        }
    };

    return (
        <div className="inset-0 border-2 fixed z-50 bg-black/50 flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-md w-[80rem] min-h-[35rem] h-max-auto mx-auto"
            >
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-blue-900 mb-4">Feature Details</h2>
                    <button
                        type="button"
                        onClick={() => onClose()}
                        className=" text-gray-600 hover:text-red-600 text-xl font-bold mb-4 "
                    >
                        ×
                    </button>
                </div>

                {/* Name */}
                <div>
                    <label className="block text-sm font-semibold text-blue-900 mb-1">
                        Name<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="Name"
                        placeholder="Name"
                        value={formData.Name || ""}
                        className="w-full px-4 py-2 border rounded-md outline-none"
                        required
                        readOnly
                    />
                </div>

                {/* Type */}
                <div>
                    <label className="block text-sm font-semibold text-blue-900 mb-1">
                        Type
                    </label>
                    <input
                        type="text"
                        value={formData.TypeofFeature || ""}
                        className="w-full mb-6 px-4 py-2 border rounded-md"
                        readOnly
                    />
                </div>

                {/* Show checkboxes based on normalized options */}
                {options.length > 0 && (
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-blue-900 mb-2">
                            Select Options
                        </label>
                        <div className="grid grid-cols-10 gap-3">
                            {options.map((option) => (
                                <label key={option.id} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedOptions.includes(option.id)}
                                        onChange={() => handleCheckboxChange(option.id)}
                                    />
                                    {option.label}
                                </label>
                            ))}
                        </div>
                    </div>
                )}

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
                            value={formData.sequence || ""}
                            className="w-full mb-4 px-4 py-2 border rounded-md outline-none"
                            readOnly
                        />
                    </div>
                    <div>
                        {/* Status */}
                        <label className="block text-sm font-semibold text-blue-900 mb-1">
                            Status
                        </label>
                        <input
                            type="text"
                            value={formData.isActive ? "Active" : "Inactive"}
                            className="w-full mb-6 px-4 py-2 border rounded-md"
                            readOnly
                        />
                    </div>
                </div>

                <div className="flex justify-between items-center py-7">
                    <div>
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
                            Save Changes
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AdditionalFeatureDetails;
