//NavbarHorizontal.jsx

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

// const SidebarLink = ({ icon, label, active }) => (
//   <div
//     className={`flex items-center gap-3 py-2 px-4 rounded-lg cursor-pointer ${
//       active ? "bg-yellow-400 text-black" : "hover:bg-gray-100"
//     }`}
//   >
//     {React.createElement(icon, { size: 20 })}
//     <span>{label}</span>
//   </div>
// );

function NavbarHorizontal({onAddNew}) {
  return (
    <>
      {/* Horizontal Bar */}
      <div className="flex flex-col py-10 px-4 bg-zinc-100  ">
        <div className=" bg-white shadow-xl p-4 rounded-xl justify-between items-center flex ">
          <div>
            <p className="text-md text-muted  opacity-50 mb-1">
              <span className="text-blue-700 opacity-50">Home</span> / Dashboard
            </p>
            <h2 className="ml-3 text-black text-xl font-medium">Categories</h2>
          </div>

          <button className="bg-yellow-400 text-blue-900 uppercase border-0 rounded-lg py-2 px-7 shadow-lg font-bold flex items-center justify-between gap-1"
          onClick={()=>onAddNew()}>
            <i class="ri-add-circle-line" style={{ fontSize: "1.3rem" }}></i>{" "}
            Add New Category
          </button>
          {/* <HorizontalNavbar icon={FiHome} label="Dashboard" active /> */}
        </div>
      </div>
    </>
  );
}

export default NavbarHorizontal;
