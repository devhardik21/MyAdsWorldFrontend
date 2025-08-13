import React from "react";
import NavbarHorizontal from "../components/NavbarHorizontal";
import DashboardCards from "../components/DashboardCards";
import { Navbar } from "../components/Navbar";

const DashboardPage = () => {
  return (
    <>
      <div className="flex">
        <Navbar />
        <div className="flex-1">
          <NavbarHorizontal current="Categories" />
          <DashboardCards />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
