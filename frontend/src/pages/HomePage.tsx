import BoardCard from "../components/BoardCard"
import { TBoardCard } from "../types/BoardTypes"
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import api from "../api";
import { useEffect, useState } from "react";
import { BoardCardSkeleton } from "../components/BoardCardSkeleton";

const HomePage = () => {
    const [allBoards, setAllBoards] = useState<TBoardCard[] | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        const fetchAllBoards = async () => {
            try {
                const res = await api.get('api/boards')
                setAllBoards(res.data)
            }
            catch (error) {
                console.log(error)
            } finally {
                console.log("loading finshed")
                setIsLoading(false)
            }
        }

        fetchAllBoards()
    }, [])


    return (
        <>
            {
                isLoading
                    ?
                    <div className="grid grid-cols-3 gap-x-4">
                        {[1, 2, 4, 5, 6].map((index) => <BoardCardSkeleton key={index} />)}
                    </div>
                    :
                    <div className="grid grid-cols-3 gap-x-4">
                        {allBoards?.map((board, index) => <BoardCard board={board} key={index}></BoardCard>)}
                        <Fab
                            color="secondary"
                            variant="extended"
                            sx={{
                                position: 'fixed',
                                bottom: 100,
                                right: 40,
                                zIndex: 1000
                            }}
                        >
                            <AddIcon className="font-bold" />
                            <span className="font-bold ms-1"> New board</span>
                        </Fab>
                    </div>
            }
        </>
    )
}

export default HomePage