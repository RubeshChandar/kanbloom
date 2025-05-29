import { DndContext, DragEndEvent } from "@dnd-kit/core";
import api from "@src/api";
import { showSnackbar } from "@src/state/SnackBarSlice";
import { ColumnsT } from "@src/types/BoardTypes";
import { TaskStatus } from "@src/types/TaskTypes";
import { ShortendUser } from "@src/types/UserProfile";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Column from "./Column";

const DnD = ({ slug }: { slug: string }) => {
    const nav = useNavigate()
    const dispatch = useDispatch()

    const Columns: ColumnsT[] = [
        { id: TaskStatus.TO_DO, title: "To Do", color: "border-blue-400", hoverColor: "ring-2 ring-blue-400 shadow-blue-200/30" },
        { id: TaskStatus.IN_PROGRESS, title: "In Progress", color: "border-yellow-400", hoverColor: "ring-2 ring-yellow-400 shadow-yellow-200/30" },
        { id: TaskStatus.BLOCKED, title: "Blocked", color: "border-red-400", hoverColor: "ring-2 ring-red-400 shadow-red-200/30", },
        { id: TaskStatus.DONE, title: "Done", color: "border-green-400", hoverColor: "ring-2 ring-green-400 shadow-green-200/30" },
    ]

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await api.get(`user/board/${slug}/`)
                console.log(res.data as ShortendUser[])
            } catch (error) {
                console.log(error)
            }
        }

        fetchUsers()

    }, [slug])

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

    return (
        <>
            <div className="flex w-full gap-6 px-2 py-6 justify-center">

                <DndContext onDragEnd={handleDragEnd}>
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