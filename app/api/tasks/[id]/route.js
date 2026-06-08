import connectDB from "@/libs/db";
import Task from "@/models/taskModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { id } = await params;
    try {
        await connectDB();
        const data = await Task.findById(id);
        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Failed to fetch task" }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    const { id } = await params;
    const { judul : judulBaru, deskripsi : deskripsiBaru, status : statusBaru } = await req.json();  
    try {
        await connectDB();
        await Task.findByIdAndUpdate(id, { judul: judulBaru, deskripsi: deskripsiBaru, status: statusBaru });
        return NextResponse.json({ message: "Data berhasil diupdate" }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Failed to update task" }, { status: 500 });
    }   
}

export async function DELETE(req, { params }) {
    const { id } = await params;
    try {
        await connectDB();
        await Task.findByIdAndDelete(id);
        return NextResponse.json({ message: "Data berhasil dihapus" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Failed to delete task" }, { status: 500 });
    }
}