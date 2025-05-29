import AddIcon from "@mui/icons-material/Add";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";

// Priority color mapping
const priorityMap = {
    1: { label: "Low", color: "bg-blue-100 text-blue-700" },
    2: { label: "Medium", color: "bg-yellow-100 text-yellow-700" },
    3: { label: "High", color: "bg-orange-200 text-orange-800" },
    4: { label: "Critical", color: "bg-red-300 text-red-900 border border-red-400" },
};

// Sample users
const sampleUsers = [
    { name: "Rubesh", img: "http://127.0.0.1:8000/media/profile_pictures/rubesh.jpeg" },
    { name: "Raveena", img: "http://127.0.0.1:8000/media/profile_pictures/raveena.jpeg" },
];

const columnsData = [
    {
        name: "To Do",
        color: "border-blue-400",
        tasks: [
            {
                id: 1,
                title: "Set up backend",
                assigned_to: { name: "Raveena", img: "http://127.0.0.1:8000/media/profile_pictures/raveena.jpeg" },
                priority: 2,
                due_date: "2025-06-10",
            },
            {
                id: 2,
                title: "Design database",
                assigned_to: null,
                priority: 1,
                due_date: "2025-06-15",
            }
        ]
    },
    {
        name: "In Progress",
        color: "border-yellow-400",
        tasks: [
            {
                id: 3,
                title: "Build API",
                assigned_to: { name: "Rubesh", img: "http://127.0.0.1:8000/media/profile_pictures/rubesh.jpeg" },
                priority: 3,
                due_date: "2025-06-12",
            }
        ]
    },
    {
        name: "Blocked",
        color: "border-red-400",
        tasks: []
    },
    {
        name: "Done",
        color: "border-green-400",
        tasks: [
            {
                id: 4,
                title: "Project setup",
                assigned_to: { name: "Rubesh", img: "http://127.0.0.1:8000/media/profile_pictures/rubesh.jpeg" },
                priority: 1,
                due_date: "2025-05-20",
            }
        ]
    }
];

const DnD = () => {
    const [columns, setColumns] = useState(columnsData);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedCard, setSelectedCard] = useState({ colIdx: null, taskIdx: null });
    const menuOpen = Boolean(anchorEl);

    const handleAvatarClick = (event, colIdx, taskIdx) => {
        setAnchorEl(event.currentTarget);
        setSelectedCard({ colIdx, taskIdx });
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedCard({ colIdx: null, taskIdx: null });
    };

    const handleAssignUser = (user) => {
        if (selectedCard.colIdx !== null && selectedCard.taskIdx !== null) {
            const newColumns = columns.map((col, ci) => {
                if (ci === selectedCard.colIdx) {
                    const newTasks = col.tasks.map((task, ti) =>
                        ti === selectedCard.taskIdx
                            ? { ...task, assigned_to: user }
                            : task
                    );
                    return { ...col, tasks: newTasks };
                }
                return col;
            });
            setColumns(newColumns);
        }
        handleMenuClose();
    };

    const handleUnassign = () => {
        handleAssignUser(null);
    };

    return (
        <div className="flex w-full gap-6 px-2 py-6 justify-center overflow-x-auto h-[78vh]">
            {
                columns.map((column, colIdx) => (
                    <div
                        key={column.name}
                        className={`bg-[#181A1B] rounded-3xl flex flex-col flex-1 border-2 ${column.color} p-5 min-w-[320px]`}
                    >
                        {/* Column header */}
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xl font-extrabold text-white tracking-wide">
                                {column.name}
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

                        {/* Task cards */}
                        <div className="flex flex-col gap-4">
                            {column.tasks.length === 0 ? (
                                <div className="text-center text-gray-500 py-6 italic">
                                    No tasks
                                </div>
                            ) : (
                                column.tasks.map((task, taskIdx) => (
                                    <div
                                        key={task.id}
                                        className="relative flex flex-col gap-2 bg-[#232526] border border-gray-800 rounded-xl px-4 py-3 cursor-grab shadow-md group"
                                    >
                                        {/* Drag handle */}
                                        <div className="absolute -left-3 top-1/2 -translate-y-1/2 text-gray-500 opacity-60 group-hover:opacity-100">
                                            <DragIndicatorIcon fontSize="small" />
                                        </div>
                                        <div className="pl-5 flex flex-col gap-2">
                                            {/* Title and Priority */}
                                            <div className="flex justify-between items-center">
                                                <h3 className="font-bold text-base text-white">{task.title}</h3>
                                                <span className={`ml-2 px-3 py-1 text-xs font-semibold rounded-full ${priorityMap[task.priority].color}`}>
                                                    {priorityMap[task.priority].label}
                                                </span>
                                            </div>
                                            {/* Assigned To */}
                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs text-gray-400">Assigned to</span>
                                                <div className="flex items-center gap-2">
                                                    <div>
                                                        <Avatar
                                                            alt={task.assigned_to ? task.assigned_to.name : "Unassigned"}
                                                            src={task.assigned_to ? task.assigned_to.img : ""}
                                                            sx={{
                                                                width: 24,
                                                                height: 24,
                                                                bgcolor: task.assigned_to ? undefined : "#3A3A3A",
                                                                color: "#B0B0B0",
                                                                fontSize: "1rem",
                                                                cursor: "pointer",
                                                            }}
                                                            onClick={(e) => handleAvatarClick(e, colIdx, taskIdx)}
                                                        >
                                                            {!task.assigned_to && "?"}
                                                        </Avatar>
                                                        <Menu
                                                            anchorEl={anchorEl}
                                                            open={menuOpen && selectedCard.colIdx === colIdx && selectedCard.taskIdx === taskIdx}
                                                            onClose={handleMenuClose}
                                                            PaperProps={{
                                                                sx: { minWidth: 180, bgcolor: "#232526", color: "#fff" }
                                                            }}
                                                        >
                                                            {sampleUsers.map((user) => (
                                                                <MenuItem key={user.name} onClick={() => handleAssignUser(user)}>
                                                                    <ListItemIcon>
                                                                        <Avatar alt={user.name} src={user.img} sx={{ width: 24, height: 24 }} />
                                                                    </ListItemIcon>
                                                                    <ListItemText>{user.name}</ListItemText>
                                                                </MenuItem>
                                                            ))}
                                                            <MenuItem onClick={handleUnassign}>
                                                                <ListItemText>Unassign</ListItemText>
                                                            </MenuItem>
                                                        </Menu>
                                                    </div>
                                                    {task.assigned_to ? (
                                                        <span className="text-sm text-gray-300">{task.assigned_to.name}</span>
                                                    ) : (
                                                        <span className="text-sm italic text-gray-500">Not assigned yet</span>
                                                    )}
                                                </div>
                                            </div>
                                            {/* Due Date */}
                                            <div className="flex items-center gap-2 mt-1">
                                                <CalendarTodayIcon fontSize="small" className="text-gray-400" />
                                                <span className="text-xs text-gray-400">{task.due_date}</span>
                                                <span className="text-xs ml-1 italic text-neon">Due in 10 days</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default DnD;