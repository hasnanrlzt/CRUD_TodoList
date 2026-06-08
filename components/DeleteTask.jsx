"use client"

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const DeleteTask = ({ id }) => {
  const router = useRouter();
  const deleteTask = async () => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });
        if (res.ok) {
          router.refresh();
          toast.success("Data berhasil dihapus.");
        }
    } catch (error) {
      console.log(error);
      toast.error("Gagal menghapus data.");
    }
  };
  return (
    <div>
        <i className="ri-delete-bin-fill ri-2x text-red-500 cursor-pointer hover:text-red-400" onClick={() => (confirm ("Apakah anda yakin?") ? deleteTask() : "" )}></i>
    </div>
  )
}

export default DeleteTask