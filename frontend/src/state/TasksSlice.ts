import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShortendTask, TaskStatus } from "@src/types/TaskTypes";

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
        }
    },
})

export default TasksSlice.reducer
export const { clearTasks, setTasks, updateTaskStatus } = TasksSlice.actions
