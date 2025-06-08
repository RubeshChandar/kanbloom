import { useDroppable } from '@dnd-kit/core';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const DropZones = () => {
    const { setNodeRef: setNodeRefView, isOver: isOverView } = useDroppable({ id: "view-detail" })
    const { setNodeRef: setNodeRefDelete, isOver: isOverDelete } = useDroppable({ id: "delete" })
    // const { setNodeRef: setNodeRefArchive, isOver: isOverArchive } = useDroppable({ id: "archive" })

    return (
        <div className="w-full flex items-center justify-center mt-6 z-[30] relative gap-10" style={{ pointerEvents: "all" }}>
            <div
                ref={setNodeRefView}
                className={`
                flex items-center justify-center gap-2 w-[400px] h-[100px] rounded-xl border-2 border-dashed border-blue-500 bg-none text-blue-200
                font-bold text-lg tracking-wider transition-all cursor-pointer
                ${isOverView ? "bg-blue-700/80 shadow-lg scale-105" : ""}
            `}
            >
                <RemoveRedEyeIcon className="w-7 h-7 mr-1 text-blue-400 animate-pulse" />
                Drop here to <span className="text-blue-400 underline ml-1">view task</span>
            </div>

            <div
                ref={setNodeRefDelete}
                className={`
                flex items-center justify-center gap-2 w-[400px] h-[100px] rounded-xl border-2 border-dashed border-red-500 bg-none text-red-200
                font-bold text-lg tracking-wider transition-all cursor-pointer
                ${isOverDelete ? "bg-red-700/80 shadow-lg scale-105" : ""}
            `}
            >
                <DeleteOutlineRoundedIcon className="w-7 h-7 mr-1 text-red-400 animate-pulse" />
                Drop here to <span className="text-red-400 underline ml-1">delete</span>
            </div>

            {/* <div
                ref={setNodeRefArchive}
                className={`
                flex items-center justify-center gap-2 w-[400px] h-[100px] rounded-xl border-2 border-dashed border-yellow-500 bg-none text-yellow-200
                font-bold text-lg tracking-wider transition-all cursor-pointer
                ${isOverArchive ? "bg-yellow-700/80 shadow-lg scale-105" : ""}
            `}
            >
                <ArchiveOutlinedIcon className="w-7 h-7 mr-1 text-yellow-400 animate-pulse" />
                Drop here to <span className="text-yellow-400 underline ml-1">archive</span>
            </div> */}
        </div>
    )
}

export default DropZones