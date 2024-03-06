import React from "react";

const SearchBar = () => {
  return (
    <form className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full"
      />
      <button type="submit " className="btn btn-circle bg-sky-500 text-white">
        Icon
      </button>
    </form>
  );
};

export default SearchBar;
