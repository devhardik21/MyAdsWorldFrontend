import React, { useState } from "react";

const FeatureCard = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="bg-blue-200 h-24 flex justify-between max-w-xs rounded-2xl shadow-xl shadow-zinc-200 hover:shadow-2xl m-4" onClick={props.onClick}>
      <div className="text-2xl flex items-center mx-4 p-5">{props.Name}</div>

      <div className="flex flex-col justify-between items-end p-1 relative">
        <div
          className="p-0.5 px-3.5 hover:bg-zinc-200 rounded-xl cursor-pointer"
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <img src="src/assets/menu.png" className="h-7 w-7" alt="Menu" />
        </div>

        {showMenu && (
           <div className="absolute top-10 left-0.5  bg-white shadow-lg rounded-md w-14 border border-gray-200">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => alert("Edit clicked")}
            >
              <img src="src/assets/edit.gif" className="h-7 w-9" alt="Menu" />

              {/* <i className="ri-file-edit-fill text-blue-900 text-2xl"></i> */}
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => props.onDelete(props.DBid)}
            >
              <img src="src/assets/bin.gif" className="h-7 w-9" alt="Menu" />
              {/* <i className="ri-delete-bin-6-fill text-amber-900 text-2xl"></i> */}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeatureCard;
