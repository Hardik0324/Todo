import {Todo} from "@/lib/model";
import { connectToDb } from "@/lib/util";
import { NextResponse } from "next/server";

export const GET = async (req: Request,  { params }: { params: { id?: string } }) => {
    try {
        connectToDb();

        const {id} = params;
        const todo = await Todo.findById(id);

        return NextResponse.json(todo);
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch todo!");
    }
}

export const PATCH = async (req: Request,  { params }: { params: { id?: string } }) =>{
    try {
        connectToDb();

        const {id} = params
        const body = await req.json()
        console.log(body)
        const todo = await Todo.findByIdAndUpdate(id , body, {new: true});

        return NextResponse.json(todo);
    } catch (error) {
        console.log(error);
        throw new Error("Failed to update todo!");
    }
}

export const DELETE = async (req: Request,  { params }: { params: { id?: string } }) => {
    try {
        connectToDb();

        const {id} = params
        await Todo.findByIdAndDelete(id);

        return NextResponse.json({messgae: "Todo deleted Successfully"})
    } catch (error) {
        console.log(error);
        throw new Error("Failed to delete todo!");
    }
}