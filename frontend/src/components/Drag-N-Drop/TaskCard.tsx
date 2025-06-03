import { useDraggable } from "@dnd-kit/core";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Avatar, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { RootState } from "@src/state/store";
import { updateTaskDetails } from "@src/state/TasksSlice";
import { MenuStyle } from "@src/styles/CustomStyleMUI";
import MyDateTimePicker from "@src/styles/MyDateTimePicker";
import { priorityMap } from "@src/types/BoardTypes";
import { ShortendTask } from "@src/types/TaskTypes";
import { ShortendUser } from "@src/types/UserProfile";
import { getDueStatus } from "@src/utils/DueStatusString";
import { updateTaskDetailBackend } from "@src/utils/TasksHelper";
import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";


const TaskCard = ({ task }: { task: ShortendTask }) => {
    const boardMembers: ShortendUser[] = useSelector((state: RootState) => state.boardMembers);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [anchorPriorityEl, setAnchorPriorityEl] = useState<null | HTMLElement>(null);
    const dueStatus = getDueStatus(task);
    const menuOpen = Boolean(anchorEl);
    const priorityMenuOpen = Boolean(anchorPriorityEl);
    const dispatch = useDispatch()
    const { setNodeRef, listeners, attributes, transform } = useDraggable({ id: task.task_id });
    const style = transform ? { transform: `translate(${transform.x}px,${transform.y}px)` } : undefined;
    const { slug } = useParams<{ slug: string }>();


    const handleAssignUser = (user: ShortendUser | undefined) => {
        dispatch(updateTaskDetails({ task_id: task.task_id, assignedTo: user }))
        updateTaskDetailBackend(slug!, dispatch,
            { task_id: task.task_id, assigned_to_id: user?.id ?? "undefined" })
        setAnchorEl(null)
    };

    const handleChangePriority = (priority: number) => {
        dispatch(updateTaskDetails({ task_id: task.task_id, priority }));
        updateTaskDetailBackend(slug!, dispatch, { task_id: task.task_id, priority })
        setAnchorPriorityEl(null);
    };

    return (
        <div
            className="relative flex shadow-lg items-stretch bg-[#232526]/80 border border-gray-800 rounded-xl px-0 py-0 cursor-grab group min-h-[106px] overflow-hidden"
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={style}
        >
            <div className={`w-2 rounded-l-xl ${priorityMap[task.priority as keyof typeof priorityMap].color}`}></div>

            <div className="flex-1 flex flex-col justify-between px-4 py-3">
                <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2">

                        <div className="mr-1 group-hover:shadow-lg transition-all duration-150 rounded-full bg-[#232526] border border-gray-600 p-1 text-gray-400 hover:bg-[#303233] cursor-grab active:scale-90">
                            <DragIndicatorIcon fontSize="small" />
                        </div>
                        <h3 onClick={() => console.log("hello")}
                            className="font-black text-base text-white leading-5 cursor-pointer">
                            {task.name}
                        </h3>
                    </div>
                    <span
                        className={`ml-2 px-2.5 py-1 text-xs font-bold uppercase rounded-full shadow-sm border ${priorityMap[task.priority as keyof typeof priorityMap].color} cursor-pointer`}
                        onClick={(e) => setAnchorPriorityEl(e.currentTarget)}
                    >
                        {priorityMap[task.priority as keyof typeof priorityMap].label}
                    </span>
                    <Menu
                        open={priorityMenuOpen}
                        anchorEl={anchorPriorityEl}
                        onClose={() => setAnchorPriorityEl(null)}
                        slotProps={MenuStyle}
                    >
                        {[1, 2, 3, 4].map(priority => (
                            <MenuItem key={priority} onClick={() => handleChangePriority(priority)}>
                                <ListItemText>
                                    {priorityMap[priority as keyof typeof priorityMap].label}
                                </ListItemText>
                            </MenuItem>
                        ))}
                    </Menu>
                </div>

                <div className="flex flex-col gap-3 mt-2">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <Avatar
                            onClick={(e) => setAnchorEl(e.currentTarget)}
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
                        <Menu
                            open={menuOpen}
                            anchorEl={anchorEl}
                            onClose={() => setAnchorEl(null)}
                            slotProps={MenuStyle}
                        >
                            {boardMembers.map(user => {
                                return <MenuItem key={user.name}
                                    onClick={() => handleAssignUser(user)}>
                                    <ListItemIcon>
                                        <Avatar alt={user.name} src={user.imageURL} sx={{ width: 24, height: 24 }} />
                                    </ListItemIcon>
                                    <ListItemText>{user.name}</ListItemText>
                                </MenuItem>
                            })}
                            <MenuItem onClick={() => handleAssignUser(undefined)}>
                                <ListItemIcon />
                                <ListItemText>Unassign</ListItemText>
                            </MenuItem>
                        </Menu>

                        <div className="flex flex-col leading-tight">
                            <span className="text-xs text-gray-400">Assigned to</span>
                            <span className="text-sm font-semibold text-gray-100">
                                {task.assigned_to ? task.assigned_to.name : <span className="italic text-gray-500">Not assigned yet</span>}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 border-t border-gray-700 pt-2 mt-1 relative">
                        <MyDateTimePicker task_id={task.task_id} current_date={task.due_date} slug={slug!} />
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
