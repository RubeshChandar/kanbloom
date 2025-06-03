import { z } from 'zod';
import { TaskStatus } from './TaskTypes';
import { ShortendUser } from "./UserProfile";

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

export type ColumnsT = {
    id: TaskStatus,
    title: string,
    color: string,
    hoverColor?: string,
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

export const priorityMap = {
    1: { label: "Low", color: "bg-blue-100 text-blue-700 border-blue-400" },
    2: { label: "Medium", color: "bg-yellow-100 text-yellow-700 border-yellow-400" },
    3: { label: "High", color: "bg-orange-200 text-orange-800 border-orange-400" },
    4: { label: "Critical", color: "bg-red-300 text-red-900 border-red-500" },
};