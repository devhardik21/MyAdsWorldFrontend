// import { useState } from 'react'

// import "./App.css";
// import Cards from "./components/Cards";
import NavbarHorizontal from "./components/NavbarHorizontal";

import { Card } from "./components/Card";

import BannerCard from "./components/BannerCard";
import { BannerPage } from "./pages/BannerPage";
import { CategoryPage } from "./pages/CategoryPage";
function App() {
  return (
    <>
      <div className="relative h-screen bg-zinc-400  flex-1 ">
        {/* <Dashboard />

        <NavbarHorizontal /> */}

        {/* <Cards/> */}

        {/* <CategoryPage></CategoryPage> */}
        <BannerPage></BannerPage>
      </div>

     
    </>
  );
}

export default App;
