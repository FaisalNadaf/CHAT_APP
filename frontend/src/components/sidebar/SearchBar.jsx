import { IoSearchSharp } from "react-icons/io5";

import React from "react";
import { useState } from "react";
import useConversation from "../../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversation";
import toast from "react-hot-toast";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handelSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search must be at least 3 characters");
    }
    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("user not found");
    }
  };

  return (
    <form onSubmit={handelSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button type="submit " className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp />
      </button>
    </form>
  );
};

export default SearchBar;
