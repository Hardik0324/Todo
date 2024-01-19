"use client";

import React, { useState } from "react";
import Image from "next/image";
import Modal from "./Modal";
import { config } from "@/lib/Config";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

interface SearchProps {
  fetchTodo: () => void;
  setTodo: React.Dispatch<React.SetStateAction<any>>;
}

const Search: React.FC<SearchProps> = ({ fetchTodo, setTodo }) => {
  const [add, setAdd] = useState(false);
  const [search, setSearch] = useState("");

  const searchTodo = async () => {
    console.log(search);
    if (search == "") {
      fetchTodo();
    } else {
      try {
        const data = await axios.get(
          `${config.backEndpoint}/api/schedules/?search=${search}`
        );
        console.log(data);
        setTodo(data.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const setSer = (ser: string) => {
    if (ser == "") {
      fetchTodo();
    }
    setSearch(ser);
  };

  return (
    <div className="w-[100%] h-[12%] p-5 flex justify-between relative">
      <div className="w-[25%] h-[100%] relative flex items-center">
        <input
          type="search"
          placeholder="Search"
          className="w-[100%] h-[100%] p-[5px] border-2 border-inherit rounded"
          onChange={(e) => setSer(e.target.value)}
        />
        <img
          src="https://cdn-icons-png.flaticon.com/512/107/107122.png"
          alt=""
          className="w-[35px] h-[75%] p-[5px] absolute right-[5%] hover: cursor-pointer"
          onClick={() => searchTodo()}
        />
      </div>
      <button
        className="w-[6%] mr-[5%] py-[8px] px-[10px] bg-[#391E5A] text-white rounded flex items-center justify-between relative"
        onClick={() => setAdd(!add)}
      >
        <div className="text-white font-bold rounded-full p-1 h-6 w-6 border-2 border-white flex justify-center items-center">
          <FaPlus />
        </div>
        Add
      </button>
      <div className="absolute right-[12%] top-[23%] z-50">
        {add && (
          <Modal
            addtodo={setAdd}
            fetchTodo={fetchTodo}
            tit={"Add Schecdule"}
            update={false}
            inde={""}
          />
        )}
      </div>
    </div>
  );
};

export default Search;
