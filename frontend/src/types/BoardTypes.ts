export enum TaskStatus {
    TO_DO = "To Do",
    IN_PROGRESS = "In Progress",
    BLOCKED = "Blocked",
    DONE = "Done",
}

export type TBoardCard = {
    id: string,
    name: string,
    taskStatus: { status: TaskStatus, count: number }[],
    members: { name: string, imageURL: string }[],
    lastUpdated: string,
}