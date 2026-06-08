import connectDB from "@/libs/db";
import Task from "../../../models/taskModel";
import { NextResponse } from "next/server";

export async function POST(req){
    const body = await req.json();
    if (!body.judul || !body.deskripsi || !body.status) {
        return NextResponse.json({message: "Data tidak boleh kosong"}, {status: 400});
    }
    try {
        await connectDB();
        const data = await Task.create(body);
        return NextResponse.json({message: "Data berhasil dibuat", data}, {status: 201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Failed to create task"}, {status: 500});
    }
}

export async function GET(){
    try {
        await connectDB();
        const data = await Task.find();
        return NextResponse.json({message: "Data berhasil diambil", data}, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Failed to fetch tasks"}, {status: 500});
    }
}
