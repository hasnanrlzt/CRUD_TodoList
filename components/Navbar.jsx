import Link from "next/link"

const Navbar = () => {
  return (
    <>
    <div className="navbar flex items-center justify-between">
      <Link href={"/"} className="text-3xl font-bold">Task App</Link>
      <Link href={"/add-task"} className="bg-lime-600 text-white p-2 rounded text-lg hover:bg-lime-500">Add Task</Link>
    </div>
    <hr className="mt-4 border border-slate-600" />
    </>
  )
}

export default Navbar