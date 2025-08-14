import React, { useState } from "react";

const BannerCard = (props) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex bg-white p-1.5 rounded-2xl shadow-2xl shadow-gray-300 hover:shadow-gray-400 transition-shadow duration-200 mx-3 my-2 h-[15rem] w-[22rem]">
      <div className="p-3">
        <img src={props.url} className="h-40 w-80 rounded-2xl" alt="Banner" />
        <div className="py-3">{props.BannerName}</div>
      </div>

      <div className="flex flex-col justify-between items-end p-1 relative">
        <div
          className="p-0.5 hover:bg-zinc-200 rounded-xl cursor-pointer"
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <img src="src/assets/menu.png" className="h-7 w-9" alt="Menu" />
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
              onClick={() => alert("Delete clicked")}
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

export default BannerCard;
