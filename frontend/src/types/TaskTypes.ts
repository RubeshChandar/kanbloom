import { ShortendUser } from "./UserProfile";

export enum TaskStatus {
    TO_DO = "TODO",
    IN_PROGRESS = "INPROGRESS",
    BLOCKED = "BLOCKED",
    DONE = "DONE",
};

export type ShortendTask = {
    task_id: string,
    assigned_to?: ShortendUser,
    name: string,
    status: TaskStatus,
    priority: number,
    completed_at?: string,
    due_date: string,
}

export type Task = ShortendTask & {
    reported_by: ShortendUser,
    description: string,
    created_at: string,
    last_modified: string,
    board: string,
}

export const TaskStatusLabel: Record<TaskStatus, string> = {
    [TaskStatus.TO_DO]: "To Do",
    [TaskStatus.IN_PROGRESS]: "In Progress",
    [TaskStatus.BLOCKED]: "Blocked",
    [TaskStatus.DONE]: "Done",
};

export type priorityNum = 1 | 2 | 3 | 4

export const priorityMap: Record<priorityNum, { label: string; color: string }> = {
    1: { label: "Low", color: "bg-blue-100 text-blue-700 border-blue-400" },
    2: { label: "Medium", color: "bg-yellow-100 text-yellow-700 border-yellow-400" },
    3: { label: "High", color: "bg-orange-200 text-orange-800 border-orange-400" },
    4: { label: "Critical", color: "bg-red-300 text-red-900 border-red-500" },
};

