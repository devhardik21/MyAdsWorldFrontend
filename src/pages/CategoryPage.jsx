//category page
import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../constants/api";
import { Card } from "../components/Card";
import NavbarHorizontal from "../components/NavbarHorizontal";
import { Navbar } from "../components/Navbar";

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(false);
  const [categories, setCategories] = useState([]);
  const [DisplayError, SetDisplayError] = useState("");

  const DeleteCategory = async (id) => {
    try {
      const response = await axios.delete(`${URL}/api_admin/delete-category/${id}`);
      console.log(response.data);
      setReload((prev)=>!prev)
    } catch (error) {
      console.log(`we got an error deleting the category ${error}`);
    }

  }

  useEffect(() => {
    const FetchCategoryData = async () => {
      try {
        const response = await axios(`${URL}/api_app/get-category`);
        setCategories(response.data);
        setLoading(false);

        console.log(response.data);
      } catch (err) {
        setError(true);
        setLoading(false);
        SetDisplayError(err);
        console.log(err);
      }
    };
    FetchCategoryData();
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
          <NavbarHorizontal />
          <div className="grid gap-2 grid-cols-3">
            {categories.listings.map((category, idx) => {
              return (
                <Card
                  key={idx}
                  Name={category.CategoryName}
                  url={category.CategoryUrl}
                  NumberofCompanies="4"
                  NumberofSub="5"
                  DBid={category._id}
                  onDelete={DeleteCategory}
                ></Card>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export { CategoryPage };
