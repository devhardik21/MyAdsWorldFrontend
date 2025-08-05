import React from "react";
import {
  FiHome,
  FiUser,
  FiBell,
  FiList,
  FiGrid,
  FiPackage,
  FiShoppingCart,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";

const SidebarLink = ({ icon, label, active }) => (
  <div
    className={`flex items-center gap-3 py-2 px-4 rounded-lg cursor-pointer  ${
      active ? " text-black" : "hover:bg-gray-300"
    }`}
   >
    {React.createElement(icon, { size: 20 })}
    <span>{label}</span>
  </div>
);

// const DashboardCard = ({ icon, title, count, color }) => (
//   <div className={`p-5 rounded-lg text-white ${color}`}>
//     <div className="flex items-center gap-3 mb-2">
//       <div className="bg-white text-black p-2 rounded-full">
//         {React.createElement(icon, { size: 20 })}
//       </div>
//       <h2 className="text-lg font-semibold">{count}</h2>
//     </div>
//     <p>{title}</p>
//   </div>
// );

const Navbar = () => {
  const navigate = useNavigate() ;
  return (
    <div className="flex h-screen  bg-zinc-100  py-8 px-4 " >
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-xl p-2 flex flex-col gap-3 rounded-xl overflow-hidden " >
        
          <h2 className="flex justify-start items-center text-xl font-semibold gap-0.5  pt-4">
            <img src="src\assets\logo1.jpg" alt="" style={{ height: "3.2rem" }} />{" "}
            My Ads World
          </h2>
          {/* <img src="src\assets\logo3.jpg" alt="" style={{ height: "3.2rem" }} /> */}
        
        <SidebarLink icon={FiHome} label="Dashboard"  />
        <SidebarLink icon={FiShoppingCart} label="Bookings" />
        <SidebarLink icon={FiUser} label="Vendors" />
        <SidebarLink icon={FiUser} label="Users" />
        <SidebarLink icon={FiBell} label="Notification" />
        <p className="mt-2 text-zinc-600 text-sm uppercase">Master Pages</p>
       <button onClick={()=>navigate('/category')}><SidebarLink icon={FiList} label="Categories" /></button>
        <SidebarLink icon={FiGrid} label="Sub-Categories" />
       <button onClick={()=>navigate('/banner')}> <SidebarLink icon={FiPackage} label="Banner" /> </button>
        <SidebarLink icon={FiPackage} label="Feature" />
        {/* <p className="mt-2 text-zinc-200 text-sm uppercase">Account Pages</p>
        <SidebarLink icon={FiUser} label="Profile" /> */}
      </div>

      {/* Horizontal Navbar */}
      {/* <div className="py-4 px-3 flex-1">
        <div className=" bg-white shadow-xl p-4 rounded-xl flex justify-between items-center ">
          <div>
            <p className="text-md text-muted  opacity-50 mb-1">
              <span className="text-blue-700 opacity-50">Home</span> / Dashboard
            </p>
            <h2 className="ml-3 text-black text-xl font-medium">Categories</h2>
          </div>

          <button className="bg-yellow-400 text-blue-900 uppercase border-0 rounded-lg py-2 px-7 shadow-lg font-bold flex items-center justify-between gap-1">
           <i class="ri-add-circle-line" style={{fontSize:'1.3rem'}}></i> Add New Category
          </button>
          <HorizontalNavbar icon={FiHome} label="Dashboard" active />
        </div>
      </div> */}
    </div>
  );
};

export {Navbar};
