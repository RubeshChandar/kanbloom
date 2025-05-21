export enum TaskStatus {
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


export type TBoardCard = {
    slug: string,
    name: string,
    taskStatus?: { status: TaskStatus, count: number }[],
    members: { id?: string, name: string, imageURL: string }[],
    lastUpdated: string,
    description?: string
}