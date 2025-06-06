import { useDroppable } from '@dnd-kit/core';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';

const DeleteZone = () => {
    const { setNodeRef, isOver } = useDroppable({ id: "delete" })
    return (
        <div className="w-full flex items-center justify-center mt-6 z-[30] relative" style={{ pointerEvents: "all" }}>
            <div
                ref={setNodeRef}
                className={`
                flex items-center justify-center gap-2 w-[400px] h-[100px] rounded-xl border-2 border-dashed border-red-500 bg-none text-red-200
                font-bold text-lg tracking-wider transition-all cursor-pointer
                ${isOver ? "bg-red-700/80 shadow-lg scale-105" : ""}
            `}
            >
                <DeleteOutlineRoundedIcon className="w-7 h-7 mr-1 text-red-400 animate-pulse" />
                Drop here to <span className="text-red-400 underline ml-1">delete</span>
            </div>
        </div>
    )
}

export default DeleteZone