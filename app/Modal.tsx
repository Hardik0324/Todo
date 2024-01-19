"use client"

import { config } from '@/lib/Config';
import axios from 'axios';
import React, {useState} from 'react'

interface ModalProps {
  addtodo: React.Dispatch<React.SetStateAction<boolean>>;
}


const Modal: React.FC<ModalProps> = ({addtodo, fetchTodo}) => {

  const [freq, setFreq] = useState("Daily");
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [subject, setSubject] = useState();
  const [repeat, setRepeat] = useState("");
  const [time, setTime] = useState("10 AM");

  const updateFreq = (frequency)=>{
    setFreq(frequency);
    if(frequency=="Monthly"){
      setRepeat("First Monday");
    }
  }

  const addTodoDb = async()=>{
    const body = {
      title,
      description,
      subject,
      frequency: freq,
      repeat,
      time
    }

    try {
      const data = await axios.post(`${config.backEndpoint}/api/schedules`,
        body
      )
      addtodo(false)
      fetchTodo()
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className='flex flex-col p-[10px] w-[336px] border-2 border-inherit rounded bg-white'>
        <div className='mb-[5px] text-black flex'>
            Add Schedule
        </div>
        <div className='mb-[8px] flex justify-between items-center'>
          <span className='h-fit text-black'>Title</span>
          <input type='text' placeholder='Enter Title' className='w-[70%] p-[5px] border-2 border-inherit rounded' onChange={(e)=>setTitle(e.target.value)}/>
        </div>
        <div className='mb-[8px] flex justify-between'>
          <span className='text-black'>Description</span>
          <textarea placeholder='Enter description' className='w-[70%] h-[80px] p-[5px] border-2 border-inherit rounded resize-none' onChange={(e)=>setDescription(e.target.value)}/>
        </div>
        <div className='mb-[8px] flex justify-between items-center'>
          <span className='h-fit text-black'>Subject</span>
          <input type='text' placeholder='Enter Subjet' className='w-[70%] p-[5px] border-2 border-inherit rounded' onChange={(e)=>setSubject(e.target.value)}/>
        </div>
        <div className='mb-[8px] flex justify-between items-center'>
          <span className='h-fit text-black'>Frequency</span>
          <select className='w-[70%] p-[5px] border-2 border-inherit rounded text-black' onChange={(e)=> updateFreq(e.target.value)}>
            <option value="Daily" className='text-black'>Daily</option>
            <option value="Weekly" className='text-black'>Weekly</option>
            <option value="Monthly" className='text-black'>Monthly</option>
          </select>
        </div>
        {
          freq != "Daily" ? (
            freq == "Monthly" ? (
            <div className='mb-[8px] flex justify-between items-center'>
              <span className='h-fit text-black'>Repeat</span>
              <select className='w-[70%] p-[5px] border-2 border-inherit rounded text-black' onChange={(e)=> setRepeat(e.target.value)}>
                <option value="First Monday" className='text-black'>First Monday</option>
                <option value="Last Friday" className='text-black'>Last Friday</option>
              </select>
            </div>
        ) : (
            <div className='mb-[8px] flex justify-between items-center'>
              <span className='h-fit text-black'>Repeat</span>
              <div className='flex gap-x-[8px]'>
                <div className='w-[24px] h-[24px] relative'>
                <input type='radio' name='repeat' value="Sunday" className='w-[24px] h-[24px] border-2 border-inherit rounded-full font-bold flex justify-center items-center' onChange={(e)=> setRepeat(e.target.value)}/>
                <span className='absolute text-black top-0 left-[30%] w-0'>S</span>
                </div>
                <div className='w-[24px] h-[24px] relative'>
                <input type='radio' name='repeat' value="Monday" className='w-[24px] h-[24px] border-2 border-inherit rounded-full font-bold flex justify-center items-center' onChange={(e)=> setRepeat(e.target.value)}/>
                <span className='absolute text-black top-0 left-[25%] w-0'>M</span>
                </div>
                <div className='w-[24px] h-[24px] relative'>
                <input type='radio' name='repeat' value="Tuesday" className='w-[24px] h-[24px] border-2 border-inherit rounded-full font-bold flex justify-center items-center' onChange={(e)=> setRepeat(e.target.value)}/>
                <span className='absolute text-black top-0 left-[30%] w-0'>T</span>
                </div>
                <div className='w-[24px] h-[24px] relative'>
                <input type='radio' name='repeat' value="Wednesday" className='w-[24px] h-[24px] border-2 border-inherit rounded-full font-bold flex justify-center items-center' onChange={(e)=> setRepeat(e.target.value)}/>
                <span className='absolute text-black top-0 left-[25%] w-0'>W</span>
                </div>
                <div className='w-[24px] h-[24px] relative'>
                <input type='radio' name='repeat' value="Thrusday" className='w-[24px] h-[24px] border-2 border-inherit rounded-full font-bold flex justify-center items-center' onChange={(e)=> setRepeat(e.target.value)}/>
                <span className='absolute text-black top-0 left-[30%] w-0'>T</span>
                </div>
                <div className='w-[24px] h-[24px] relative'>
                <input type='radio' name='repeat' value="Friday" className='w-[24px] h-[24px] border-2 border-inherit rounded-full font-bold flex justify-center items-center' onChange={(e)=> setRepeat(e.target.value)}/>
                <span className='absolute text-black top-0 left-[30%] w-0'>F</span>
                </div>
                <div className='w-[24px] h-[24px] relative'>
                <input type='radio' name='repeat' value="Saturday" className='w-[24px] h-[24px] border-2 border-inherit rounded-full font-bold flex justify-center items-center' onChange={(e)=> setRepeat(e.target.value)}/>
                <span className='absolute text-black top-0 left-[30%] w-0'>S</span>
                </div>
              </div>
            </div>
        )
          ) : (<></>) 
        }
        <div className='mb-[8px] flex justify-between items-center'>
          <span className='h-fit text-black'>Time</span>
          <select className='w-[70%] p-[5px] border-2 border-inherit rounded text-black' onChange={(e)=>setTime(e.target.value)}>
            <option value="10 AM" className='text-black'>10 AM</option>
            <option value="4 PM" className='text-black'>4 PM</option>
            <option value="10 PM" className='text-black'>10 PM</option>
          </select>
        </div>
        <div className='mb-[8px] gap-x-[20px] flex justify-end items-center'>
            <button className='py-[5px] w-[91px] bg-[#EBE8EF] border-2 border-inherit rounded text-black' onClick={()=> addtodo(false)}>
              Cancel
            </button>
            <button className='py-[5px] w-[91px] bg-[#391E5A] border-2 border-black rounded text-white' onClick={()=> addTodoDb()}>
              Done
            </button>
        </div>
    </div>
  )
}

export default Modal