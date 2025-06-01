import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, UniqueIdentifier, useSensor, useSensors } from "@dnd-kit/core";
import { RootState } from "@src/state/store";
import { clearTasks, updateTaskStatus } from "@src/state/TasksSlice";
import { ColumnsT } from "@src/types/BoardTypes";
import { TaskStatus, TaskStatusLabel } from "@src/types/TaskTypes";
import { fetchTasksAndUsers, updateTaskStatusBackend } from "@src/utils/TasksHelper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Column from "./Column";
import TaskCard from "./TaskCard";

const DnD = ({ slug }: { slug: string }) => {
    const dispatch = useDispatch()
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)

    const Columns: ColumnsT[] = [
        { id: TaskStatus.TO_DO, title: TaskStatusLabel.TODO, color: "border-blue-400", hoverColor: "ring-2 ring-blue-400 shadow-blue-200/30" },
        { id: TaskStatus.IN_PROGRESS, title: TaskStatusLabel.INPROGRESS, color: "border-yellow-400", hoverColor: "ring-2 ring-yellow-400 shadow-yellow-200/30" },
        { id: TaskStatus.BLOCKED, title: TaskStatusLabel.BLOCKED, color: "border-red-400", hoverColor: "ring-2 ring-red-400 shadow-red-200/30", },
        { id: TaskStatus.DONE, title: TaskStatusLabel.DONE, color: "border-green-400", hoverColor: "ring-2 ring-green-400 shadow-green-200/30" },
    ]

    useEffect(() => {
        fetchTasksAndUsers(slug, dispatch)
        return () => { dispatch(clearTasks()) }
    }, [slug, dispatch])

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        setActiveId(active.id)
    }

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return
        dispatch(updateTaskStatus({ task_id: active.id as string, status: over.id as TaskStatus }))
        setActiveId(null)
        updateTaskStatusBackend(slug, dispatch, active.id as string, over.id as TaskStatus)
    }

    const sensors = useSensors(
        useSensor(
            PointerSensor, {
            activationConstraint: {
                distance: 6,
                delay: 100,
                tolerance: 5
            }
        }),
    )
    const allTasks = useSelector((state: RootState) => state.Tasks)

    return (
        <>
            <div className="flex w-full gap-6 px-2 py-6 justify-center">
                <DndContext
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    sensors={sensors}>
                    {
                        Columns.map(
                            (column) =>
                                <Column key={column.id} column={column}
                                    tasks={allTasks.filter(task => task.status === column.id)} />
                        )
                    }
                    <DragOverlay
                        dropAnimation={{
                            duration: 150,
                            easing: 'cubic-bezier(0.18, 0.67,0.6,1.22)'
                        }}>
                        {activeId ?
                            <TaskCard task={allTasks.find(task => task.task_id === activeId)!} />
                            : null}
                    </DragOverlay>

                </DndContext>
            </div>
        </>
    )
}

export default DnD