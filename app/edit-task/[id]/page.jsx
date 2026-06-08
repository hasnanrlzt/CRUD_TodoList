import React from 'react'
import EditTaskForm from '@/components/EditTaskForm'

const getSingleTask = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch task");
      }
      return res.json();

    } catch (error) {
      console.log(error);
    }
}

const EditTask = async ({ params }) => {
  const { id } = await params;
  // console.log(id);
  const { data } = await getSingleTask(id);
  // console.log(data);
  const {judul, deskripsi, status} = data;

  return (
    <div>
        <EditTaskForm id={id} judul={judul} deskripsi={deskripsi} status={status} />
    </div>
  )
}

export default EditTask