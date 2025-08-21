import React, { useEffect, useState } from "react";
import { FiShoppingCart, FiUser, FiPackage, FiGrid } from "react-icons/fi";
import axios from "axios";
import { URL } from "../constants/api";

const Card = ({ icon: Icon, title, count, color }) => (
  <div className={`p-5 rounded-lg text-white ${color}`}>
    <div className="flex items-center gap-3 mb-2">
      <div className="bg-white text-black p-2 rounded-full">
        <Icon size={20} />
      </div>
      <h2 className="text-lg font-semibold">{count}</h2>
    </div>
    <p>{title}</p>
  </div>
);

const DashboardCards = () => {
  const [catnumb, setCatnumb] = useState(0);
  const [subcatnumb, setSubCatnumb] = useState(0);
  const [listingnumb, setListingNumb] = useState(0);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [DisplayErr, setDisplayErr] = useState("");

  useEffect(() => {
    const FetchDashboardData = async () => {
      try {
        // const response = await axios.get(`${URL}/api_admin/get-category-count`) ;
        // setCatnumb(response.data.NumberofCategories) ;
        // const subCatResp = await axios.get(`${URL}/api_admin/get-subcategory-count`) ;
        const [catResp, subCatResp, ListingResp] = await Promise.all([
          axios.get(`${URL}/api_admin/get-category-count`),
          axios.get(`${URL}/api_admin/get-subcategory-count`),
          axios.get(`${URL}/api_admin/get-listing-count`),
        ]);
        setCatnumb(catResp.data.NumberofCategories);
        setSubCatnumb(subCatResp.data.NumberofSubCategories);
        setListingNumb(ListingResp.data.ListingNumber);

        setLoading(false);
      } catch (error) {
        setErr(true);
        setDisplayErr(error.message);
        setLoading(false);
      }
    };

    FetchDashboardData();
  }, []);

  if (loading) {
    // return <h2> Your Categories are loading</h2>;
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader  w-[50px] p-[8px]"></div>
      </div>
    );
  }
  if (err) {
    return (
      <p className="text-red-500">
        {" "}
        we got an error while loading this page {DisplayErr}
      </p>
    );
  }
  return (
    <div className="bg-zinc-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2 mb-8 px-4 bg-zinc-100">
        <Card
          icon={FiShoppingCart}
          title="Total Listings"
          count={listingnumb}
          color="bg-yellow-400 text-black"
        />
        <Card
          icon={FiUser}
          title="Total Users"
          count="12"
          color="bg-blue-500"
        />

        <Card
          icon={FiUser}
          title="Total Vendors"
          count="34"
          color="bg-blue-500"
        />

        <Card
          icon={FiPackage}
          title="Total Categories"
          count={catnumb}
          color="bg-blue-500"
        />
        <Card
          icon={FiGrid}
          title="Total Sub Categories"
          count={subcatnumb}
          color="bg-blue-500"
        />
      </div>
    </div>
  );
};

export default DashboardCards;
