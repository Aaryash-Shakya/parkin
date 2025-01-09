import React from "react";
import { IoSearch } from "react-icons/io5";

const Searchbar = () => {
  return (
    <div className="absolute top-2 left-0 w-full py-2 px-4 flex items-center justify-center">
      <input
        type="text"
        className="px-4 py-4 pl-5 w-full rounded-full border-2 border-white relative text-md shadow-[0_4px_20px_4px_rgba(0,0,0,0.2)] focus:border-2 focus:border-black-500 outline-none"
        placeholder="search"
      />
      <div className="search-icon absolute top-6 right-8">
        <IoSearch size={25} className="text-black-500" />
      </div>
    </div>
  );
};

export default Searchbar;
