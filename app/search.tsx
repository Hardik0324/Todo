"use client"

import React, {useState} from 'react';
import Image from 'next/image';
import Modal from './Modal';
import { config } from '@/lib/Config';
import axios from 'axios';

const Search = ({fetchTodo, setTodo}) => {

  const [add, setAdd] = useState(false)
  const [search, setSearch] = useState("")

  const searchTodo = async()=>{
    console.log(search)
    if(search==""){
      fetchTodo()
    }
    else{
      try {
        const data = await axios.get(`${config.backEndpoint}/api/schedules/?search=${search}`)
        console.log(data)
        setTodo(data.data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const setSer = (ser)=>{
    if(ser==""){
      fetchTodo()
    }
    setSearch(ser);
  }

  return (
    <div className='w-[100%] h-[12%] p-5 flex justify-between relative'>
        <div className='w-[25%] h-[100%] relative flex items-center'>
            <input type="search" placeholder="Search" className='w-[100%] h-[100%] p-[5px] border-2 border-inherit rounded' onChange={(e)=>setSer(e.target.value)}/>
            <img src="https://cdn-icons-png.flaticon.com/512/107/107122.png" alt="" className='w-[35px] h-[75%] p-[5px] absolute right-[5%] hover: cursor-pointer' onClick={()=>searchTodo()} />
        </div>
         <button className='w-[6%] mr-[5%] py-[8px] px-[10px] bg-[#391E5A] text-white rounded flex items-center justify-between relative' onClick={()=>setAdd(!add)}>
            <img src="https://cdn-user-icons.flaticon.com/134585/134585999/1705505056332.svg?token=exp=1705505971~hmac=068540da1a946db58737983ee754896b" alt=""  className='h-[70%]'/>
            Add
         </button>
          <div className='absolute right-[12%] top-[23%] z-50'>
            {
              add && (<Modal addtodo={setAdd} fetchTodo={fetchTodo} tit={"Add Schecdule"}/>)
            }
          </div>
    </div>
  );
};

export default Search;
