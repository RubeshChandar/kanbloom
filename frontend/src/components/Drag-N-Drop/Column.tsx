// If you haven't already, install Framer Motion by running: npm install framer-motion
import { useDroppable } from "@dnd-kit/core";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import '@src/index.css';
import { ColumnsT } from "@src/types/BoardTypes";
import { ShortendTask } from "@src/types/TaskTypes";
import { AnimatePresence, motion } from "framer-motion";
import TaskCard from "./TaskCard";

const Column = ({ column, tasks }: { column: ColumnsT, tasks: ShortendTask[] }) => {
    const { setNodeRef, isOver } = useDroppable({ id: column.id })

    return (
        <div
            className={`bg-[#181A1B] rounded-3xl flex flex-col flex-1 border-2 custom-scroll-bar
                ${column.color} p-5 transition-shadow duration-150 
                ${isOver ? column.hoverColor : ""}`}
            ref={setNodeRef}
        >
            <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-extrabold text-white tracking-wide">
                    {column.title}
                </span>
                <div className="flex items-center gap-1">
                    <Button
                        variant="contained"
                        size="small"
                        sx={{
                            minWidth: 0,
                            padding: "4px",
                            bgcolor: "#CFFF04",
                            color: "#181A1B",
                            '&:hover': { bgcolor: "#B6E400" }
                        }}
                    >
                        <AddIcon />
                    </Button>
                    <MoreVertIcon className="text-white opacity-70" />
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <AnimatePresence>
                    {tasks.length === 0 ? (
                        <motion.div
                            key="notasks"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center text-gray-500 py-6 italic"
                        >
                            No tasks
                        </motion.div>
                    ) : tasks.map(task => (
                        <motion.div
                            key={task.task_id}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.4, duration: 0.13 }}
                        >
                            <TaskCard task={task} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default Column