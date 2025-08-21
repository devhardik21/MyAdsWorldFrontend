import React, { useEffect, useState } from "react";
import BannerCard from "../components/BannerCard";
import { URL } from "../constants/api.js";
import axios from "axios";
import { Navbar } from "../components/Navbar.jsx";
import NavbarHorizontal from "../components/NavbarHorizontal.jsx";
import AddBanner from "../components/AddBanner.jsx";

export const BannerPage = () => {
  const [error, SetError] = useState(false);
  const [DisplayError, SetDisplayError] = useState("");
  const [reload, setReload] = useState(false);
  const [loading, SetLoading] = useState(true);
  const [banners, SetBanners] = useState([]);
  const [addBanner, SetAddBanner] = useState(false);

  const DeleteBanner = async (id) => {
    try {
      const response = await axios.delete(
        `${URL}/api_admin/delete-banner/${id}`
      );
      console.log(response.data);
      setReload((prev) => !prev);
      console.log("banner deleted");
    } catch (error) {
      console.log(`we got an error deleting the banner ${error}`);
    }
  };

  useEffect(() => {
    const FetchBanner = async () => {
      try {
        const response = await axios.get(`${URL}/api_app/get-banners`);
        console.log(response);
        console.log(response.data);

        SetBanners(response.data);
      } catch (error) {
        SetError(true);
        console.log(`Error is :- ${error}`);
        SetDisplayError(error.message);
      } finally {
        SetLoading(false);
        console.log("finally block");
      }
    };

    FetchBanner();
  }, [reload]);

  if (loading) {
    // return (
    //     <h3>Your Banners are loading </h3>
    // )
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader  w-[50px] p-[8px]"></div>
      </div>
    );
  }
  if (error) {
    return (
      <h3 className="text-xl text-red-500">
        {" "}
        We got an error fetching the data {DisplayError}
      </h3>
    );
  }

    return (
        <div className=' bg-zinc-100 flex'>
            <Navbar></Navbar>
            <div className=''>
                <NavbarHorizontal name="Banners" btn="Add new Banner" onAddNew={()=>SetAddBanner(true)}></NavbarHorizontal>
                {
                    addBanner? <AddBanner onClose={()=>SetAddBanner(false)} onCreate={()=>setReload((prev)=>!prev)}></AddBanner> : null
                }
                <div className='grid grid-cols-3 gap-2'>
                    {
                        banners.BannerDetails.map((banner, idx) => {
                            return <BannerCard url={banner.BannerUrl} BannerName={banner.BannerName} key={idx} DBid={banner._id} onDelete = {DeleteBanner}></BannerCard>
                        })
                    }
                </div>

            </div>
        </div>
    )

}
