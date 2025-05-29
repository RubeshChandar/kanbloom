import { useDraggable } from "@dnd-kit/core";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Avatar } from "@mui/material";
import { ShortendTask } from "@src/types/TaskTypes";
import dayjs from "dayjs";

const TaskCard = ({ task }: { task: ShortendTask }) => {
    const priorityMap = {
        1: { label: "Low", color: "bg-blue-100 text-blue-700 border-blue-400" },
        2: { label: "Medium", color: "bg-yellow-100 text-yellow-700 border-yellow-400" },
        3: { label: "High", color: "bg-orange-200 text-orange-800 border-orange-400" },
        4: { label: "Critical", color: "bg-red-300 text-red-900 border-red-500" },
    };

    // Get due status color
    const getDueStatus = () => {
        if (task.completed_at) {
            const completed = dayjs(task.completed_at).startOf("day");
            const due = dayjs(task.due_date).startOf("day");
            const diff = completed.diff(due, "day");
            if (diff === 0) {
                return { text: "Completed on time", color: "text-green-400 font-bold" };
            }
            if (diff > 0) {
                return {
                    text: `Completed ${diff} day${diff === 1 ? "" : "s"} after deadline`,
                    color: "text-red-500 font-bold"
                };
            }
            // diff < 0
            return {
                text: `Completed ${Math.abs(diff)} day${Math.abs(diff) === 1 ? "" : "s"} early`,
                color: "text-green-400 font-bold"
            };
        }
        // If not completed, keep previous logic
        const today = dayjs().startOf("day");
        const due = dayjs(task.due_date).startOf("day");
        const diff = due.diff(today, "day");
        if (diff === 0) return { text: "Due today", color: "text-neutral-300 font-semibold" };
        if (diff > 0) {
            if (diff <= 3) return { text: `Due in ${diff} day${diff === 1 ? "" : "s"}`, color: "text-yellow-400 font-bold" };
            return { text: `Due in ${diff} day${diff === 1 ? "" : "s"}`, color: "text-green-400 font-semibold" };
        }
        return { text: `Overdue by ${Math.abs(diff)} day${diff === -1 ? "" : "s"}`, color: "text-red-500 font-bold" };
    };
    const dueStatus = getDueStatus();

    const { setNodeRef, listeners, attributes, transform } = useDraggable({ id: task.task_id });
    const style = transform ? { transform: `translate(${transform.x}px,${transform.y}px)` } : undefined;

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={style}
            className="relative flex shadow-lg items-stretch bg-[#232526]/80 border border-gray-800 rounded-xl px-0 py-0 cursor-grab group min-h-[106px] overflow-hidden"
        >

            <div className={`w-2 rounded-l-xl ${priorityMap[task.priority as keyof typeof priorityMap].color}`}></div>

            <div className="flex-1 flex flex-col justify-between px-4 py-3">
                <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2">

                        <div className="mr-1 group-hover:shadow-lg transition-all duration-150 rounded-full bg-[#232526] border border-gray-600 p-1 text-gray-400 hover:bg-[#303233] cursor-grab active:scale-90">
                            <DragIndicatorIcon fontSize="small" />
                        </div>
                        <h3 className="font-black text-base text-white leading-5 drop-shadow-sm">{task.name}</h3>
                    </div>
                    <span className={`ml-2 px-2.5 py-1 text-xs font-bold uppercase rounded-full shadow-sm border ${priorityMap[task.priority as keyof typeof priorityMap].color}`}>
                        {priorityMap[task.priority as keyof typeof priorityMap].label}
                    </span>
                </div>

                <div className="flex flex-col gap-3 mt-2">

                    <div className="flex items-center gap-2">
                        <Avatar
                            alt={task.assigned_to ? task.assigned_to.name : "Unassigned"}
                            src={task.assigned_to ? task.assigned_to.imageURL : ""}
                            sx={{
                                width: 28,
                                height: 28,
                                bgcolor: task.assigned_to ? undefined : "#3A3A3A",
                                color: "#B0B0B0",
                                fontSize: "1rem",
                                cursor: "pointer",
                            }}
                        >
                            {!task.assigned_to && "?"}
                        </Avatar>
                        <div className="flex flex-col leading-tight">
                            <span className="text-xs text-gray-400">Assigned to</span>
                            <span className="text-sm font-semibold text-gray-100">
                                {task.assigned_to ? task.assigned_to.name : <span className="italic text-gray-500">Not assigned yet</span>}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 border-t border-gray-700 pt-2 mt-1">
                        <CalendarTodayIcon fontSize="small" className="text-gray-400" />
                        <span className="text-xs text-gray-400">{dayjs(task.due_date).format("D MMM, YYYY")}</span>
                        <span className={`text-xs ml-1 italic ${dueStatus.color}`}>
                            {dueStatus.text}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
