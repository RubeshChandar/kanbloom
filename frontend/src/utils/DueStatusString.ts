import { ShortendTask } from "@src/types/TaskTypes";
import dayjs from "dayjs";

export const getDueStatus = (task: ShortendTask) => {
    if (task.completed_at) {
        const completed = dayjs(task.completed_at).startOf("day");
        const due = dayjs(task.due_date).startOf("day");
        const diff = completed.diff(due, "day");
        if (diff === 0) {
            return { text: "Completed on time", color: "text-green-400 font-bold" };
        }
        if (diff > 0) {
            return {
                text: `Completed ${diff} day${diff === 1 ? "" : "s"} after deadline`,
                color: "text-red-500 font-bold"
            };
        }
        // diff < 0
        return {
            text: `Completed ${Math.abs(diff)} day${Math.abs(diff) === 1 ? "" : "s"} early`,
            color: "text-green-400 font-bold"
        };
    }
    // If not completed, keep previous logic
    const today = dayjs().startOf("day");
    const due = dayjs(task.due_date).startOf("day");
    const diff = due.diff(today, "day");
    if (diff === 0) return { text: "Due today", color: "text-neutral-300 font-semibold" };
    if (diff > 0) {
        if (diff <= 3) return { text: `Due in ${diff} day${diff === 1 ? "" : "s"}`, color: "text-yellow-400 font-bold" };
        return { text: `Due in ${diff} day${diff === 1 ? "" : "s"}`, color: "text-green-400 font-semibold" };
    }
    return { text: `Overdue by ${Math.abs(diff)} day${diff === -1 ? "" : "s"}`, color: "text-red-500 font-bold" };

}