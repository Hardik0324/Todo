"use client"

import React,  {useEffect, useState} from 'react'
import axios from 'axios'
import {config} from '@/lib/Config'

const Table = ({todo, fetchTodo}) => {

    const deleteTodo = async(id)=>{
        try {
            const data = await axios.delete(`${config.backEndpoint}/api/schedules/${id}`)
            fetchTodo();
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='m-5 border-2 border-inherit rounded'>
        <div className='flex w-[100%] py-2 px-4 bg-[#D8D2DE]'>
            <span className='w-[15%]'>Title</span>
            <span className='w-[35%]'>Description</span>
            <span className='w-[15%]'>Subject</span>
            <span className='w-[15%]'>Schedule</span>
            <span className='w-[20%]'>Actions</span>
        </div>
        {
            todo?.map((item)=>(
                <div className='flex w-[100%] py-2 px-4 bg-[#FFFFFF]'>
                    <span className='w-[15%]'>{item?.title}</span>
                    <span className='w-[35%]'>{item?.description}</span>
                    <span className='w-[15%]'>{item?.subject}</span>
                    <span className='w-[15%]'>{item?.frequency=="Daily" ? (item?.frequency) : (item?.repeat)} at {item?.time}</span>
                    <span className='w-[20%] flex gap-2'>
                        <img src='https://cdn-icons-png.flaticon.com/512/10146/10146590.png' alt='' className='w-[20px] h-[20px] hover: cursor-pointer'/>
                        <img src='https://cdn-user-icons.flaticon.com/134585/134585999/1705613498260.svg?token=exp=1705614406~hmac=4f794140083783758078696696071460' alt='' className='w-[20px] h-[20px] hover: cursor-pointer' onClick={()=>deleteTodo(item._id)}/>
                    </span>
                </div>
            ))
        }
    </div>
  )
}

export default Table