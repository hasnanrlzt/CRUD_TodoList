import Link from "next/link";
import StatusTask from "./StatusTask";
import DeleteTask from "./DeleteTask";


// const getTasks = async () => {
//     try {
//         const res = await fetch("/api/tasks", {
//             cache: "no-store",
//             next: { revalidate: 0 },
//         });
        
//         if (!res.ok) {
//             throw new Error("Failed to fetch tasks");

//         }
//         return res.json();
//     } catch (error) {
//         console.log(error);
//         return { data: [] };
//     }
// };

const getTasks = async () => {
    try {
        const res = await fetch(
            new URL("/api/tasks", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
            { cache: "no-store" }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch tasks");
        }

        return await res.json();
    } catch (error) {
        console.log(error);
        return { data: [] };
    }
};

const TaskList = async () => {
    const result = await getTasks();
    const data = result?.data ?? [];

    return (
        <>
            {data.length === 0 ? (
                <>
                    <p className="font-bold mt-20 text-center">Data tidak ada.</p>
                </>
            ) : (
                <>
                    {data.map((task, index) => (
                        <div key={task._id}>
                            <div className="mt-10 flex items-center justify-between gap-10" key={index}>
                                <div className="box">
                                    <h1 className={`font-bold text-xl/loose w-fit ${task.status === "Belum Mulai" ? "text-red-500" : 
                                        task.status === "Sedang Dikerjakan" ? "text-yellow-500" : "text-green-500 line-through"}`}>
                                        {task.judul}
                                    </h1>
                                    <p className="text-sm text-slate-400">{task.deskripsi}</p>
                                </div>
                                <div className="box flex gap-2 items-center">
                                    <StatusTask status={task.status} />
                                    <Link href={`/edit-task/${task._id}`}>
                                        <i className="ri-pencil-fill ri-2x text-sky-400 cursor-pointer hover:text-sky-300"></i>
                                    </Link>
                                    <DeleteTask id={task._id} />
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </>
    )
}

export default TaskList