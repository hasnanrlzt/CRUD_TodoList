 "use client"
 import { useState } from 'react';
 import { useRouter } from 'next/navigation';
 import { toast } from 'react-toastify';
 
 const EditTaskForm = ({ id, judul, deskripsi, status }) => {
    const [judulBaru, setJudulBaru] = useState(judul);
    const [deskripsiBaru, setDeskripsiBaru] = useState(deskripsi);
    const [statusBaru, setStatusBaru] = useState(status);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/tasks/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ judul: judulBaru, deskripsi: deskripsiBaru, status: statusBaru }),
            });

            if (!res.ok) {
                throw new Error("Data gagal diupdate!");
            }
            router.push("/");
            router.refresh();
            toast.success("Data berhasil diupdate!");
        }catch (error) {
            console.log(error);
            toast.error("Data gagal diupdate!");
        }
    }
  return (
    <>
            <div className="mt-10">
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="judul" className="font-semibold text-slate-200">Judul Task</label>
                        <input type="text" name="judul" id="judul" placeholder="Masukkan Judul Task ..."
                            autoComplete="off" className="p-2 bg-slate-700 rounded text-slate-200" 
                            onChange={(e) => setJudulBaru(e.target.value)} value={judulBaru}/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="deskripsi" className="font-semibold text-slate-200">Deskripsi Task</label>
                        <input type="text" name="deskripsi" id="deskripsi" placeholder="Masukkan Deskripsi Task ..."
                            autoComplete="off" className="p-2 bg-slate-700 rounded text-slate-200" 
                            onChange={(e) => setDeskripsiBaru(e.target.value)} value={deskripsiBaru}/>
                    </div>
                    <div className="flex gap-4 items-center justify-start">
                        <label htmlFor="status" className="font-semibold text-slate-200">Status Task</label>
                        <select name="status" id="status" className="p-2 bg-slate-700 rounded text-slate-200"
                            onChange={(e) => setStatusBaru(e.target.value)} value={statusBaru}>
                            <option value="Belum Mulai">Belum Mulai</option>
                            <option value="Sedang Dikerjakan">Sedang Dikerjakan</option>
                            <option value="Selesai">Selesai</option>
                        </select>
                    </div>
                    <button type="submit" className="bg-green-600 text-white p-2 rounded hover:bg-green-500">Update Data</button>
                </form>
            </div>
        </>
  )
}


export default EditTaskForm