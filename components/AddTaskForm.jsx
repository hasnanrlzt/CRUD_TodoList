"use client"
import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const AddTaskForm = () => {
    const [judul, setJudul] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [status, setStatus] = useState("Belum Mulai");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!judul || !deskripsi) {
            return toast.error("Judul dan Deskripsi harus diisi!");
        }

        try {
            const res = await fetch('api/tasks', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ judul, deskripsi, status }),
            });

            if (res.ok) {
                router.push("/");
                toast.success("Task berhasil ditambahkan!");
            }

        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className="mt-10">
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="judul" className="font-semibold text-slate-200">Judul Task</label>
                        <input type="text" name="judul" id="judul" placeholder="Masukkan Judul Task ..."
                            autoComplete="off" className="p-2 bg-slate-700 rounded text-slate-200"
                            onChange={(e) => setJudul(e.target.value)} value={judul} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="deskripsi" className="font-semibold text-slate-200">Deskripsi Task</label>
                        <input type="text" name="deskripsi" id="deskripsi" placeholder="Masukkan Deskripsi Task ..."
                            autoComplete="off" className="p-2 bg-slate-700 rounded text-slate-200"
                            onChange={(e) => setDeskripsi(e.target.value)} value={deskripsi} />
                    </div>
                    <div className="flex gap-4 items-center justify-start">
                        <label htmlFor="status" className="font-semibold text-slate-200">Status Task</label>
                        <select name="status" id="status" className="p-2 bg-slate-700 rounded text-slate-200"
                            onChange={(e) => setStatus(e.target.value)} value={status}>
                            <option value="Belum Mulai">Belum Mulai</option>
                            <option value="Sedang Dikerjakan">Sedang Dikerjakan</option>
                            <option value="Selesai">Selesai</option>
                        </select>
                    </div>
                    <button type="submit" className="bg-green-600 text-white p-2 rounded hover:bg-green-500">Create Data</button>
                </form>
            </div>
        </>
    )
}

export default AddTaskForm