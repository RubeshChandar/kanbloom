import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import api from "@src/api";
import { setBoardMembers } from "@src/state/BoardMembersSlice";
import { showSnackbar } from "@src/state/SnackBarSlice";
import { ColumnsT } from "@src/types/BoardTypes";
import { TaskStatus, TaskStatusLabel } from "@src/types/TaskTypes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Column from "./Column";

const DnD = ({ slug }: { slug: string }) => {
    const nav = useNavigate()
    const dispatch = useDispatch()

    const Columns: ColumnsT[] = [
        { id: TaskStatus.TO_DO, title: TaskStatusLabel.TODO, color: "border-blue-400", hoverColor: "ring-2 ring-blue-400 shadow-blue-200/30" },
        { id: TaskStatus.IN_PROGRESS, title: TaskStatusLabel.INPROGRESS, color: "border-yellow-400", hoverColor: "ring-2 ring-yellow-400 shadow-yellow-200/30" },
        { id: TaskStatus.BLOCKED, title: TaskStatusLabel.BLOCKED, color: "border-red-400", hoverColor: "ring-2 ring-red-400 shadow-red-200/30", },
        { id: TaskStatus.DONE, title: TaskStatusLabel.DONE, color: "border-green-400", hoverColor: "ring-2 ring-green-400 shadow-green-200/30" },
    ]

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await api.get(`user/board/${slug}/`)
                dispatch(setBoardMembers(res.data))
            } catch (error) {
                console.log(error)
            }
        }

        fetchUsers()

    }, [slug, dispatch])

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return

        api
            .post(`api/${slug}/tasks/update-status/`, {
                task_id: active.id,
                status: over.id
            })
            .then((res) => {
                if (res.data['warning'])
                    dispatch(showSnackbar({
                        message: res.data['warning'],
                        severity: "warning"
                    }))
                nav(`/boards/${slug}?refresh=${Date.now()}`, { replace: true })
            })
            .catch(error => console.log(error))
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

    return (
        <>
            <div className="flex w-full gap-6 px-2 py-6 justify-center">
                <DndContext
                    onDragEnd={handleDragEnd}
                    sensors={sensors}>
                    {
                        Columns.map(
                            (column) =>
                                <Column key={column.id} column={column} />
                        )
                    }

                </DndContext>
            </div>
        </>
    )
}

export default DnD