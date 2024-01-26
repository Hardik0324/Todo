"use client";

import { config } from "@/lib/Config";
import axios from "axios";
import React, { useState } from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";


interface ModalProps {
  addtodo: React.Dispatch<React.SetStateAction<boolean>>;
  fetchTodo: () => void;
  tit: string;
  update: boolean;
  inde: string;
}

const Modal: React.FC<ModalProps> = ({
  addtodo,
  fetchTodo,
  tit,
  update,
  inde,
}) => {
  console.log(inde);

  const days = [
    {
      name: "sunday",
      value: "S",
    },
    {
      name: "monday",
      value: "M",
    },
    {
      name: "tuesday",
      value: "T",
    },
    {
      name: "wednesday",
      value: "W",
    },
    {
      name: "thursday",
      value: "T",
    },
    {
      name: "friday",
      value: "F",
    },
    {
      name: "saturday",
      value: "S",
    },
  ];
  

  const [freq, setFreq] = useState<string>("Daily");
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [subject, setSubject] = useState<string | undefined>(undefined);
  const [repeat, setRepeat] = useState<string>("");
  const [time, setTime] = useState<Date>();

  const updateFreq = (frequency: string) => {
    setFreq(frequency);
    if (frequency == "Monthly") {
      setRepeat("First Monday");
    }
  };

  const formatDateToAMPM = (isoDateString : Date) => {
    const date = new Date(isoDateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours} ${period}`;
  };

  const addTodoDb = async () => {
    const body = {
      title,
      description,
      subject,
      frequency: freq,
      repeat,
      time: formatDateToAMPM(time),
    };
    try {
      const data = await axios.post(
        `${config.backEndpoint}/api/schedules`,
        body
      );
      addtodo(false);
      fetchTodo();
    } catch (error) {
      console.log(error);
    }
  };
  const updateTodoDb = async () => {
    const body = {
      title,
      description,
      subject,
      frequency: freq,
      repeat,
      time: dayjs(time),
    };

    try {
      const data = await axios.patch(
        `${config.backEndpoint}/api/schedules/${inde}`,
        body
      );
      addtodo(false);
      fetchTodo();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col p-[10px] w-[336px] border-2 border-inherit rounded bg-white">
      <div className="mb-[5px] text-black flex">{tit}</div>
      <div className="mb-[8px] flex justify-between items-center">
        <span className="h-fit text-black">Title</span>
        <input
          type="text"
          placeholder="Enter Title"
          className="w-[70%] p-[5px] border-2 border-inherit rounded"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-[8px] flex justify-between">
        <span className="text-black">Description</span>
        <textarea
          placeholder="Enter description"
          className="w-[70%] h-[80px] p-[5px] border-2 border-inherit rounded resize-none"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-[8px] flex justify-between items-center">
        <span className="h-fit text-black">Subject</span>
        <input
          type="text"
          placeholder="Enter Subjet"
          className="w-[70%] p-[5px] border-2 border-inherit rounded"
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div className="mb-[8px] flex justify-between items-center">
        <span className="h-fit text-black">Frequency</span>
        <select
          className="w-[70%] p-[5px] border-2 border-inherit rounded text-black"
          onChange={(e) => updateFreq(e.target.value)}
        >
          <option value="Daily" className="text-black">
            Daily
          </option>
          <option value="Weekly" className="text-black">
            Weekly
          </option>
          <option value="Monthly" className="text-black">
            Monthly
          </option>
        </select>
      </div>
      {freq != "Daily" ? (
        freq == "Monthly" ? (
          <div className="mb-[8px] flex justify-between items-center">
            <span className="h-fit text-black">Repeat</span>
            <select
              className="w-[70%] p-[5px] border-2 border-inherit rounded text-black"
              onChange={(e) => setRepeat(e.target.value)}
            >
              <option value="First Monday" className="text-black">
                First Monday
              </option>
              <option value="Last Friday" className="text-black">
                Last Friday
              </option>
            </select>
          </div>
        ) : (
          <div className="mb-[8px] flex justify-between items-center">
            <span className="h-fit text-black">Repeat</span>
            <div className="flex gap-[8px] ml-0">
              {days.map((day) => (
                <button
                  key={day.name}
                  onClick={() => setRepeat(day.name)}
                  className={
                    "p-1 rounded-full border-2 h-6 w-6 flex justify-center items-center text-xs " +
                    (repeat == day.name ? "bg-black text-white" : "text-black")
                  }
                >
                  {day.value}
                </button>
              ))}
            </div>
          </div>
        )
      ) : (
        <></>
      )}
      <div className="mb-[8px] flex justify-between items-center">
        <span className="h-fit text-black">Time</span>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["TimePicker", "TimePicker"]}>
            <TimePicker
              value={time}
              onChange={(newValue) => {newValue && setTime(newValue)}}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <div className="mb-[8px] gap-x-[20px] flex justify-end items-center">
        <button
          className="py-[5px] w-[91px] bg-[#EBE8EF] border-2 border-inherit rounded text-black"
          onClick={() => addtodo(false)}
        >
          Cancel
        </button>
        {update ? (
          <button
            className="py-[5px] w-[91px] bg-[#391E5A] border-2 border-black rounded text-white"
            onClick={() => updateTodoDb()}
          >
            Update
          </button>
        ) : (
          <button
            className="py-[5px] w-[91px] bg-[#391E5A] border-2 border-black rounded text-white"
            onClick={() => addTodoDb()}
          >
            Done
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;
