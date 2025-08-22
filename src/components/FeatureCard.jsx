import React, { useState } from "react";

const FeatureCard = (props) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      className="bg-blue-200 h-24 flex justify-between max-w-xs rounded-2xl shadow-xl shadow-zinc-200 hover:shadow-2xl m-4 hover:cursor-pointer"
      onClick={props.onClick}
    >
      {/* Card title */}
      <div className="text-2xl flex items-center mx-4 p-5">{props.Name}</div>

      {/* Menu */}
      <div className="flex flex-col justify-between items-end p-1 relative">
        {/* Menu Button */}
        <div
          className="p-0.5 px-3.5 hover:bg-zinc-200 rounded-xl cursor-pointer"
          onClick={(e) => {
            e.stopPropagation(); // prevent card click
            setShowMenu((prev) => !prev);
          }}
        >
          <img src="/menu.png" className="h-7 w-7" alt="Menu" />
        </div>

        {/* Dropdown */}
        {showMenu && (
          <div
            className="absolute top-10 left-0.5 bg-white shadow-lg rounded-md w-14 border border-gray-200"
            onClick={(e) => e.stopPropagation()} // prevent card click when inside menu
          >
            {/* Edit */}
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                alert("Edit clicked");
                setShowMenu(false); // close menu after action
              }}
            >
              <img src="/edit.gif" className="h-7 w-9" alt="Edit" />
            </button>

            {/* Delete */}
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                props.onDelete(props.DBid);
                setShowMenu(false); // close menu after action
              }}
            >
              <img src="/bin.gif" className="h-7 w-9" alt="Delete" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeatureCard;
