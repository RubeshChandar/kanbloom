import { z } from 'zod';
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
    description?: string,
    created_at?: string
}


export const BasicBoardEditSchema = z.object({
    name: z.string()
        .min(3, { message: "Name can't be less than 3 characters" })
        .max(100, { message: "Name can't be more than 100 characters" }),

    description: z.string()
        .min(10, { message: "Type atleast 10 characters" })
        .max(300, { message: "Field can't be more than 300 characters" })
        .optional(),
})

export type TBasicBoardEdit = z.infer<typeof BasicBoardEditSchema>