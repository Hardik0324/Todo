"use client"

import React,  {useEffect, useState} from 'react'
import axios from 'axios'
import {config} from '@/lib/Config'
import Modal from './Modal'
import Image from 'next/image'

interface Todo {
  _id: string;
  title: string;
  description: string;
  subject: string;
  frequency: string;
  repeat: string;
  time: string;
}

interface TableProps {
  todo: Todo[];
  fetchTodo: () => void;
}

const Table: React.FC<TableProps> = ({ todo, fetchTodo }) => {
  const [add, setAdd] = useState(false);
  const [ind, setInd] = useState<number | undefined>(undefined);

  const deleteTodo = async (id: string) => {
    try {
      const data = await axios.delete(
        `${config.backEndpoint}/api/schedules/${id}`
      );
      fetchTodo();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(add);

  const set = (index: number) => {
    setAdd(!add);
    setInd((prevInd) => (prevInd === index ? undefined : index));
  };
  return (
    <div className="m-5 border-2 border-inherit rounded">
      <div className="flex w-[100%] py-2 px-4 bg-[#D8D2DE]">
        <span className="w-[15%]">Title</span>
        <span className="w-[35%]">Description</span>
        <span className="w-[15%]">Subject</span>
        <span className="w-[15%]">Schedule</span>
        <span className="w-[20%]">Actions</span>
      </div>
      {todo?.map((item, index) => (
        <div key={item._id} className="flex w-[100%] py-2 px-4 bg-[#FFFFFF]">
          <span className="w-[15%]">{item?.title}</span>
          <span className="w-[35%]">{item?.description}</span>
          <span className="w-[15%]">{item?.subject}</span>
          <span className="w-[15%]">
            {item?.frequency == "Daily" ? item?.frequency : item?.repeat} at{" "}
            {item?.time}
          </span>
          <span className="w-[20%] flex gap-2 relative -z-0">
            <Image
              src="https://cdn-icons-png.flaticon.com/512/10146/10146590.png"
              alt=""
              width={20}
              height={20}
              className="w-[16px] h-[16px] hover: cursor-pointer"
              onClick={() => set(index)}
            />
            <Image
              src="https://cdn-icons-png.flaticon.com/512/13645/13645593.png"
              alt=""
              width={20}
              height={20}
              className="w-[14px] h-[16px] hover: cursor-pointer"
              onClick={() => deleteTodo(item._id)}
            />
            <div className="absolute top-[100%] right-[100%]">
              {add && ind == index ? (
                <Modal
                  addtodo={setAdd}
                  fetchTodo={fetchTodo}
                  tit={"Edit Schecdule"}
                  update={true}
                  inde={item?._id}
                />
              ) : (
                <></>
              )}
            </div>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Table