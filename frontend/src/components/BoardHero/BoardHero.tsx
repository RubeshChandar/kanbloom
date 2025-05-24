
import { CircularProgress } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
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
        return <div className="text-white text-center"><CircularProgress /></div>;
    }

    return (
        < div className="bg-white/10 flex items-center px-20 py-10" >
            <div className="w-full max-w-7xl grid grid-cols-6 gap-10">
                <div className="col-span-4 flex flex-col justify-center space-y-6">
                    <h1 className="text-5xl font-bold text-neon leading-tight">
                        {board.name}
                    </h1>
                    <p className="text-secondary text-lg max-w-xl font-extrabold">
                        {board.description}
                    </p>

                    <div className="flex flex-row justify-start gap-[7%] items-center">
                        <div className='flex flex-col justify-center items-center'>
                            <button className="bg-neon text-black font-bold px-6 py-4 rounded-xl cursor-pointer hover:brightness-60 transition">
                                <EditIcon className="me-1" /> Edit Board
                            </button>
                            <span className="mt-3 text-red-400 text-[15px] font-bold">
                                Last updated : {board.lastUpdated}
                            </span>
                            <span className="mt-1 text-red-400 text-[15px] font-bold">
                                Total Tasks: <span className='text-teal-400'> {board.totalTasks}</span>
                            </span>
                        </div>

                        <BoardProgress
                            taskCount={board.taskCount}
                            totalTasks={board.totalTasks}
                        />
                    </div>
                </div>

                <BoardMembers
                    owner={board.owned_by}
                    members={board.members}
                />

            </div>
        </div >
    )
}

export default BoardHero