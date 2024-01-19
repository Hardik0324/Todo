"use client"

import React,  {useEffect, useState} from 'react'
import axios from 'axios'
import {config} from '@/lib/Config'
import Modal from './Modal'

const Table = ({todo, fetchTodo}) => {

    const [add, setAdd] = useState(false)
    const [ind, setInd] = useState()

    const deleteTodo = async(id)=>{
        try {
            const data = await axios.delete(`${config.backEndpoint}/api/schedules/${id}`)
            fetchTodo();
        } catch (error) {
            console.log(error);
        }
    }
    console.log(add)

    const set = (index) =>{
        setAdd(!add);
        setInd(index)
    }
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
            <img
              src="https://cdn-icons-png.flaticon.com/512/10146/10146590.png"
              alt=""
              className="w-[20px] h-[20px] hover: cursor-pointer"
              onClick={() => set(index)}
            />
            <img
              src="https://cdn-user-icons.flaticon.com/134585/134585999/1705613498260.svg?token=exp=1705614406~hmac=4f794140083783758078696696071460"
              alt=""
              className="w-[20px] h-[20px] hover: cursor-pointer"
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
}

export default Table