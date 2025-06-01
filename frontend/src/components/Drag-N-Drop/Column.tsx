import { useDroppable } from "@dnd-kit/core";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import api from "@src/api";
import '@src/index.css';
import { showSnackbar } from "@src/state/SnackBarSlice";
import { ColumnsT } from "@src/types/BoardTypes";
import { ShortendTask } from "@src/types/TaskTypes";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import TaskCard from "./TaskCard";

const Column = ({ column }: { column: ColumnsT }) => {
    const { slug } = useParams<{ slug: string }>();
    const dispatch = useDispatch()
    const [tasks, setTasks] = useState<ShortendTask[]>([]);
    const location = useLocation()

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = (await api.get(`api/${slug}/tasks?only=${column.id}`)).data as ShortendTask[];
                setTasks(res)
            }
            catch (error) {
                if (axios.isAxiosError(error)) {
                    dispatch(showSnackbar({
                        message: error.response?.data['message'],
                        severity: "error"
                    }))
                }
            }

        }

        fetchTasks()
    }, [slug, dispatch, column.id, location])

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
                {tasks.length === 0 ? (
                    <div className="text-center text-gray-500 py-6 italic">
                        No tasks
                    </div>
                ) : tasks.map(task =>
                    <TaskCard task={task} key={task.task_id} />
                )}
            </div>
        </div>
    )
}

export default Column