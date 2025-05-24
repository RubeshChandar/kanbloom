import { ShortendUser } from "./UserProfile";

enum TaskStatus {
    TO_DO = "TODO",
    IN_PROGRESS = "INPROGRESS",
    BLOCKED = "BLOCKED",
    DONE = "DONE",
};

export const TaskStatusLabel: Record<TaskStatus, string> = {
    [TaskStatus.TO_DO]: "To Do",
    [TaskStatus.IN_PROGRESS]: "In Progress",
    [TaskStatus.BLOCKED]: "Blocked",
    [TaskStatus.DONE]: "Done",
};


export type TaskCount = {
    "TODO": number,
    "INPROGRESS": number,
    "BLOCKED": number,
    "DONE": number
}

export type Board = {
    slug: string,
    name: string,
    taskCount: TaskCount,
    totalTasks: number,
    members: ShortendUser[],
    owned_by: ShortendUser,
    lastUpdated: string,
    description?: string
}
