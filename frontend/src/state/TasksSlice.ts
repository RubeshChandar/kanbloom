import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShortendTask, TaskStatus } from "@src/types/TaskTypes";
import { ShortendUser } from "@src/types/UserProfile";

export type UpdateTaskDetailsType = {
    task_id: string,
    assignedTo?: ShortendUser | undefined,
    priority?: number,
    dueDate?: string,
}

const initialState: ShortendTask[] = [];

const TasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        clearTasks: () => [],
        setTasks: (_state, action: PayloadAction<ShortendTask[]>) => action.payload,
        updateTaskStatus: (state, action: PayloadAction<{ task_id: string, status: TaskStatus }>) => {
            const taskToBeUpdated = state.find(task => task.task_id === action.payload.task_id)
            taskToBeUpdated!.status = action.payload.status
            if (action.payload.status == TaskStatus.DONE) {
                taskToBeUpdated!.completed_at = new Date().toISOString();
            } else {
                taskToBeUpdated!.completed_at = undefined
            }
        },
        updateTaskDetails: (state, action: PayloadAction<UpdateTaskDetailsType>) => {
            const task = state.find(task => task.task_id === action.payload.task_id)
            if (!task) return

            if ("assignedTo" in action.payload) {
                task.assigned_to = action.payload.assignedTo;
            }

            if (action.payload.dueDate) {
                task.due_date = action.payload.dueDate
            }

            if (action.payload.priority) {
                task.priority = action.payload.priority
            }
        },
        deleteTask: (state, action: PayloadAction<{ id: string }>) => {
            return state.filter(task => task.task_id !== action.payload.id)
        }
    },
})

export default TasksSlice.reducer
export const { clearTasks, setTasks, updateTaskStatus, updateTaskDetails, deleteTask } = TasksSlice.actions
