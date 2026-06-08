const StatusTask = ( status ) => {
  let bgColor;

  if (status.status === "Belum Mulai") {
    bgColor = "bg-red-500";
  } else if (status.status === "Sedang Dikerjakan") {
    bgColor = "bg-yellow-500";
  } else if (status.status === "Selesai") {
    bgColor = "bg-green-500";
  }

  return (
    <span className={`${bgColor} px-3 py-2 rounded w-fit h-fit text-center`}>
        {status.status}
    </span>
  )
}

export default StatusTask; 