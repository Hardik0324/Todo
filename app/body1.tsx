"use client"

import React, {useState, useEffect} from 'react'
import Search from './search'
import Table from './Table'
import axios from 'axios';
import { config } from '@/lib/Config';

const Body1 = () => {

    const [todo, setTodo] = useState([]);

    const fetchTodo = async()=>{
        try { 
            const res = await axios.get(`${config.backEndpoint}/api/schedules`)
            setTodo(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchTodo();
    },[])

  return (
    <div className='h-[100%] w-[95%]'>
        <div className='h-[5%] w-[100%] bg-[#D8D2DE]'>
        </div>
        <Search fetchTodo={fetchTodo} setTodo={setTodo}/>
        <Table todo={todo} fetchTodo={fetchTodo}/>
    </div>
  )
}

export default Body1