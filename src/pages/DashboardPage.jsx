import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarHorizontal from "../components/NavbarHorizontal";
import DashboardCards from "../components/DashboardCards";
import { Navbar } from "../components/Navbar";
import { URL } from "../constants/api";

const DashboardPage = () => {
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
    <>
      <div className="flex">
        <Navbar />
        <div className="flex-1">
          <NavbarHorizontal current="Categories" name="Dashboard" btn={null} />
          <DashboardCards />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
