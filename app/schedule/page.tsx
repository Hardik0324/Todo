"use client"

import React, {useState} from 'react'

const modal = () => {

  const [freq, setFreq] = useState("Daily")

  return (
    <div className='flex flex-col p-[10px] w-[336px] border-2 border-inherit rounded'>
        <div className='mb-[5px]'>
            Add Schedule
        </div>
        <div className='mb-[8px] flex justify-between items-center'>
          <span className='h-fit'>Title</span>
          <input type='text' placeholder='Enter Title' className='w-[70%] p-[5px] border-2 border-inherit rounded'/>
        </div>
        <div className='mb-[8px] flex justify-between'>
          <span>Description</span>
          <textarea placeholder='Enter description' className='w-[70%] h-[80px] p-[5px] border-2 border-inherit rounded resize-none'/>
        </div>
        <div className='mb-[8px] flex justify-between items-center'>
          <span className='h-fit'>Subject</span>
          <input type='text' placeholder='Enter Subjet' className='w-[70%] p-[5px] border-2 border-inherit rounded'/>
        </div>
        <div className='mb-[8px] flex justify-between items-center'>
          <span className='h-fit'>Frequency</span>
          <select className='w-[70%] p-[5px] border-2 border-inherit rounded' onChange={(e)=> setFreq(e.target.value)}>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>
        {
          freq != "Daily" ? (
            freq == "Monthly" ? (
            <div className='mb-[8px] flex justify-between items-center'>
              <span className='h-fit'>Repeat</span>
              <select className='w-[70%] p-[5px] border-2 border-inherit rounded'>
                <option value="First Monday">First Monday</option>
                <option value="Last Friday">Last Friday</option>
              </select>
            </div>
        ) : (
            <div className='mb-[8px] flex justify-between items-center'>
              <span className='h-fit'>Repeat</span>
              <div className='flex gap-x-[8px]'>
                <div className='w-[24px] h-[24px] relative'>
                <input type='radio' name='repeat' value="Sunday" className='w-[24px] h-[24px] border-2 border-inherit rounded-full font-bold flex justify-center items-center' onChange={(e)=> console.log(e.target.value)}/>
                <span className='absolute text-black top-0 left-[30%] w-0'>S</span>
                </div>
                <div className='w-[24px] h-[24px] relative'>
                <input type='radio' name='repeat' value="Monday" className='w-[24px] h-[24px] border-2 border-inherit rounded-full font-bold flex justify-center items-center'/>
                <span className='absolute text-black top-0 left-[25%] w-0'>M</span>
                </div>
                <div className='w-[24px] h-[24px] relative'>
                <input type='radio' name='repeat' value="Tuesday" className='w-[24px] h-[24px] border-2 border-inherit rounded-full font-bold flex justify-center items-center'/>
                <span className='absolute text-black top-0 left-[30%] w-0'>T</span>
                </div>
                <div className='w-[24px] h-[24px] relative'>
                <input type='radio' name='repeat' value="Wednesday" className='w-[24px] h-[24px] border-2 border-inherit rounded-full font-bold flex justify-center items-center'/>
                <span className='absolute text-black top-0 left-[25%] w-0'>W</span>
                </div>
                <div className='w-[24px] h-[24px] relative'>
                <input type='radio' name='repeat' value="Thrusday" className='w-[24px] h-[24px] border-2 border-inherit rounded-full font-bold flex justify-center items-center'/>
                <span className='absolute text-black top-0 left-[30%] w-0'>T</span>
                </div>
                <div className='w-[24px] h-[24px] relative'>
                <input type='radio' name='repeat' value="Friday" className='w-[24px] h-[24px] border-2 border-inherit rounded-full font-bold flex justify-center items-center'/>
                <span className='absolute text-black top-0 left-[30%] w-0'>F</span>
                </div>
                <div className='w-[24px] h-[24px] relative'>
                <input type='radio' name='repeat' value="Saturday" className='w-[24px] h-[24px] border-2 border-inherit rounded-full font-bold flex justify-center items-center'/>
                <span className='absolute text-black top-0 left-[30%] w-0'>S</span>
                </div>
              </div>
            </div>
        )
          ) : (<></>) 
        }
        <div className='mb-[8px] flex justify-between items-center'>
          <span className='h-fit'>Time</span>
          <select className='w-[70%] p-[5px] border-2 border-inherit rounded'>
            <option value="10 AM">10 AM</option>
            <option value="4 PM">4 PM</option>
            <option value="10 PM">10 PM</option>
          </select>
        </div>
        <div className='mb-[8px] gap-x-[20px] flex justify-end items-center'>
            <button className='py-[5px] w-[91px] bg-[#EBE8EF] border-2 border-inherit rounded'>
              Cancel
            </button>
            <button className='py-[5px] w-[91px] bg-[#391E5A] border-2 border-black rounded text-white'>
              Done
            </button>
        </div>
    </div>
  )
}

export default modal