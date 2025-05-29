import { ShortendUser } from "./UserProfile";

export enum TaskStatus {
    TO_DO = "TODO",
    IN_PROGRESS = "INPROGRESS",
    BLOCKED = "BLOCKED",
    DONE = "DONE",
};

export type ShortendTask = {
    task_id: string,
    assigned_to: ShortendUser,
    name: string,
    status: TaskStatus,
    priority: number,
    completed_at?: string,
    due_date?: string,
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