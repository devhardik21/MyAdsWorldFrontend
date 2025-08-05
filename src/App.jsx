import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarHorizontal from "./components/NavbarHorizontal";
import { Card } from "./components/Card";
import BannerCard from "./components/BannerCard";
import { BannerPage } from "./pages/BannerPage";
import { CategoryPage } from "./pages/CategoryPage";
import DashboardCards from "./components/DashboardCards";
import { Navbar } from "./components/Navbar";
import MenuPage from "./components/MenuPage";
function App() {
  return (
    <>
      <div className="h-screen bg-zinc-400  flex-1 ">
        <BannerPage></BannerPage>
        {/* <MenuPage/> */}
      </div>

    </>
  );
}

export default App;
