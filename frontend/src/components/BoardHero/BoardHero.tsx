import { CircularProgress } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import '@src/index.css';
import { useEffect, useState } from "react";
import api from "@src/api";
import { Board } from "@src/types/BoardTypes";
import BoardMembers from "./BoardMembers";
import BoardProgress from "./BoardProgress";

const BoardHero = ({ slug }: { slug: string }) => {
    const [board, setboard] = useState<Board | null>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        api.get(`/api/boards/${slug}`)
            .then(res => {
                console.log(res.data)
                return setboard(res.data)
            })
            .catch(e => console.log(e))
            .finally(() => setIsLoading(false))
    }, [slug])

    if (isLoading || !board) {
        return (
            <div className="flex items-center justify-center h-full py-20 text-white">
                <CircularProgress />
            </div>
        );
    }

    return (
        < div className="flex items-center px-20 py-10 bg-white/10" >
            <div className="grid w-full grid-cols-6 gap-10 max-w-7xl">

                <div className="flex flex-col justify-center col-span-4 space-y-6">
                    <h1 className="text-5xl font-bold leading-tight text-neon">
                        {board.name}
                    </h1>
                    <p className="max-w-xl text-lg font-extrabold text-secondary">
                        {board.description}
                    </p>

                    <div className="flex flex-row justify-between gap-[8%] mt-3">
                        <button className="px-6 py-4 font-bold text-black transition cursor-pointer bg-neon rounded-xl hover:brightness-60">
                            <EditIcon className="me-1" /> Edit Board
                        </button>
                        <button className="px-6 py-4 font-bold text-black transition bg-teal-400 cursor-pointer rounded-xl hover:brightness-60">
                            <ManageAccountsIcon className="me-1" /> Manage members
                        </button>
                        <button className="px-6 py-4 font-bold text-black transition bg-red-500 cursor-pointer rounded-xl hover:brightness-60">
                            <DeleteIcon className="me-1" /> Delete Board
                        </button>
                    </div>
                </div>

                <BoardMembers
                    owner={board.owned_by}
                    members={board.members}
                />

                <div className="col-span-4">
                    <BoardProgress
                        taskCount={board.taskCount}
                        totalTasks={board.totalTasks}
                    />
                </div>

                <div className="col-span-2">
                    <div className="flex flex-col gap-2 p-4 bg-white/5 rounded-xl">
                        <span className="text-sm font-semibold text-red-400">
                            Created at: <span className="text-white">9th March, 2021</span>
                        </span>
                        <span className="text-sm font-semibold text-red-400">
                            Last updated: <span className="text-white">{board.lastUpdated}</span>
                        </span>
                        <span className="text-sm font-semibold text-red-400">
                            Total Tasks: <span className="font-bold text-teal-400">{board.totalTasks}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default BoardHero