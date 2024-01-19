import {Todo} from "@/lib/model";
import { connectToDb } from "@/lib/util";
import { NextResponse } from "next/server";
import {type NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        connectToDb();

        const searchParams = req.nextUrl.searchParams
        const search = searchParams.get("search")
        console.log(search)
        const todos = search ? await Todo.find({title: search}) : await Todo.find();

        let resp = [];

        if(Array.isArray(todos)){
          resp = todos;
        }
        else{
          resp.push(todos)
        }

        return NextResponse.json(resp);

    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch todo's!");
    }
}

export const POST = async (req: Request)=>{
    try {
        connectToDb();

        const body = await req.json();

        const todo = await Todo.create(body);

        return NextResponse.json(todo);
        
    } catch (error) {
        console.log(error)
        throw new Error("Failed to create todo!")
    }
}
