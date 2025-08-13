import React from "react";
import { FiShoppingCart, FiUser, FiPackage, FiGrid } from "react-icons/fi";

const Card = ({ icon: Icon, title, count, color }) => (
  <div className={`p-5 rounded-lg text-white ${color}`}>
    <div className="flex items-center gap-3 mb-2">
      <div className="bg-white text-black p-2 rounded-full">
        <Icon size={20} />
      </div>
      <h2 className="text-lg font-semibold">{count}</h2>
    </div>
    <p>{title}</p>
  </div>
);

const DashboardCards = () => {
  return (
    <div className="bg-zinc-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2 mb-8 px-4 bg-zinc-100">
        <Card
          icon={FiShoppingCart}
          title="Total Bookings"
          count="0"
          color="bg-yellow-400 text-black"
        />
        <Card
          icon={FiUser}
          title="Total Vendors"
          count="34"
          color="bg-blue-500"
        />
        <Card
          icon={FiUser}
          title="Total Users"
          count="12"
          color="bg-blue-500"
        />
        <Card
          icon={FiPackage}
          title="Total Categories"
          count="9"
          color="bg-blue-500"
        />
        <Card
          icon={FiGrid}
          title="Total Sub Categories"
          count="33"
          color="bg-blue-500"
        />
      </div>
    </div>
  );
};

export default DashboardCards;
