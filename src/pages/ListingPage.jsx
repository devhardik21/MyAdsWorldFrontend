//category page
import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../constants/api";
import { Card } from "../components/Card";
import NavbarHorizontal from "../components/NavbarHorizontal";
import { Navbar } from "../components/Navbar";
import ListingCard from "../components/ListingCard";

const ListingPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(false);
  const [listings, setListing] = useState([]);
  const [DisplayError, SetDisplayError] = useState("");

  const DeleteListing = async (id) => {
    try {
      const response = await axios.delete(`${URL}/api_admin/delete-listing/${id}`);
      console.log(response.data);
      setReload((prev)=>!prev)
    } catch (error) {
      console.log(`we got an error deleting the listing ${error}`);
    }

  }

  useEffect(() => {
    const FetchListingData = async () => {
      try {
        const response = await axios(`${URL}/api_app/get-additional-details`);
        setListing(response.data);
        setLoading(false);

        console.log(response.data);
      } catch (err) {
        setError(true);
        setLoading(false);
        SetDisplayError(err);
        console.log(err);
      }
    };

    FetchListingData() ;
  }, [reload]);

  if (loading) {
    return <h2> Your Categories are loading</h2>;
  }

  if (error) {
    return (
      <p className="text-red-600">
        We got error while loading the category ie {DisplayError}
      </p>
    );
  }
  return (
    <>
      <div className="flex ">
        <Navbar></Navbar>

        <div className="bg-zinc-100 flex-1">
          <NavbarHorizontal name="Listings"  btn={null}/>
          <div className="grid gap-2 grid-cols-3">
            {listings.AllAdditionalDetails.map((listing, idx) => {
              return (
                <ListingCard
                  key={idx}
                  Name={listing.Name}
                  url={listing.ImageUrl}
                  email={listing.Email}
                  DBid={listing._id}
                  onDelete = {DeleteListing}
                ></ListingCard>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export { ListingPage };
