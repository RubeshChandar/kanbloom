import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { CircularProgress } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import api from "@src/api";
import '@src/index.css';
import { Board } from "@src/types/BoardTypes";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import BoardEditForm from '../BoardEditForm';
import BoardMembers from "./BoardMembers";
import BoardProgress from "./BoardProgress";

const BoardHero = ({ slug }: { slug: string }) => {
    const [board, setboard] = useState<Board | null>();
    const [isLoading, setIsLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const location = useLocation()

    useEffect(() => {
        setIsLoading(true)
        api.get(`/api/boards/${slug}`)
            .then(res => {
                console.log(res.data)
                return setboard(res.data)
            })
            .catch(e => console.log(e))
            .finally(() => setIsLoading(false))
    }, [slug, location])

    if (isLoading || !board) {
        return (
            <Backdrop open={isLoading}>
                < CircularProgress />
            </Backdrop>

        );
    }

    return (
        <div className="flex items-center px-20 py-10 bg-white/10" >

            <Backdrop
                open={showForm}
                sx={{
                    zIndex: (theme) => theme.zIndex.modal + 1,
                    backdropFilter: 'blur(8px)',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                }}
            >
                <BoardEditForm
                    slug={board.slug}
                    setShowForm={setShowForm}
                    basicDetail={{ name: board.name, description: board.description }}
                />
            </Backdrop>

            <div className="grid w-full grid-cols-6 gap-10">

                <div className="flex flex-col justify-center col-span-4 space-y-6">
                    <h1 className="text-5xl font-bold leading-tight text-neon">
                        {board.name}
                    </h1>
                    <p className="max-w-xl text-lg font-extrabold whitespace-pre-line text-secondary">
                        {board.description}
                    </p>

                    <div className="flex flex-row justify-start gap-[7%] mt-3">
                        <button onClick={() => setShowForm(!showForm)}
                            className="px-6 py-4 font-bold text-black transition cursor-pointer bg-neon rounded-xl hover:brightness-60">
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

                <div className="col-span-2 "
                >
                    <BoardMembers
                        owner={board.owned_by}
                        members={board.members}
                    />
                </div>

                <div className="col-span-3">
                    <BoardProgress
                        taskCount={board.taskCount}
                        totalTasks={board.totalTasks}
                    />
                </div>

                <div className="col-span-2 col-start-5">
                    <div className="flex flex-col gap-3 p-5 border text-md bg-white/10 border-white/20 rounded-xl">
                        <div className="flex justify-between font-medium text-red-400">
                            <span>Created at:</span>
                            <span className="font-semibold text-white">{board.created_at}</span>
                        </div>
                        <div className="flex justify-between font-medium text-red-400">
                            <span>Last updated:</span>
                            <span className="font-semibold text-white">{board.lastUpdated}</span>
                        </div>
                        <div className="flex justify-between pt-3 mt-2 font-medium text-red-400 border-t border-white/80">
                            <span>Total Tasks:</span>
                            <span className="font-bold text-teal-400">{board.totalTasks}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default BoardHero