import React from "react";
import SearchBar from "./SearchBar";
import Conversations from "./conversations";
import LogoutBtn from "./LogoutBtn";

const Sidebar = () => {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <SearchBar />
      <div className="divider px-3"/>
    
      <Conversations />
      <LogoutBtn/>
    </div>
  );
};
export default Sidebar;
