import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import NavbarHorizontal from "../components/NavbarHorizontal";
import { URL } from "../constants/api";
import axios from "axios";
import FeatureCard from "../components/FeatureCard";
import AddFeature from "../components/AddFeature";
import AdditionalFeatureDetails from "../components/AdditionalDetFeature";
const FeaturePage = () => {
  const [features, setFeatures] = useState([]);
  const [error, setErrors] = useState(false);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);
  const [DisplayError, SetDisplayError] = useState("");
  const [addFeature, setAddFeature] = useState(false);
  const [additionalDetofFeature, SetadditionalDetofFeature] = useState(false);
  const [IdofFeature, setIdofFeature] = useState("");

  useEffect(() => {
    const FetchFeatureData = async () => {
      try {
        const response = await axios.get(`${URL}/api_admin/get-feature`);
        console.log("Feature data successfully fetched");
        setFeatures(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setErrors(true);
        SetDisplayError(error.message);
      }
    };

    FetchFeatureData();
  }, [reload]);

  const DeleteFeature = async (id) => {
    try {
      const response = await axios.delete(
        `${URL}/api_admin/delete-feature/${id}`
      );
      console.log(response.data);
      setReload((prev) => !prev);
      console.log("feature deleted");
    } catch (error) {
      console.log(`we got an error deleting the feature ${error}`);
    }
  };

  if (loading) {
    return (
      // <p>Your feature section is loading</p>
      <div className="flex items-center justify-center h-screen">
        <div className="loader  w-[50px] p-[8px]"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500"> We got an error : {DisplayError}</p>;
  }

  return (
    <div className="bg-zinc-100 min-h-screen flex">
      <Navbar></Navbar>
      <div>
        <NavbarHorizontal
          name="Features"
          btn="Add new Feature"
          onAddNew={() => {
            setAddFeature(true);
          }}
        ></NavbarHorizontal>
        {addFeature ? (
          <AddFeature onClose={() => setAddFeature(false)}></AddFeature>
        ) : null}
        {additionalDetofFeature ? (
          <AdditionalFeatureDetails
            onClose={() => SetadditionalDetofFeature(false)}
            DBid={IdofFeature}
          ></AdditionalFeatureDetails>
        ) : null}
        <div className=" grid grid-cols-3">
          {features.AllFeatures.map((feature, idx) => {
            return (
              <FeatureCard
                Name={feature.Name}
                key={idx}
                onDelete={DeleteFeature}
                DBid={feature._id}
                onClick={() => {
                  SetadditionalDetofFeature(true);
                  setIdofFeature(feature._id);
                }}
              ></FeatureCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeaturePage;
