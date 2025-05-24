import BoardCard from "../components/BoardCard"
import { Board } from "../types/BoardTypes"
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import api from "../api";
import { useEffect, useMemo, useState } from "react";
import { BoardCardSkeleton } from "../components/BoardCardSkeleton";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

const HomePage = () => {
    const [allBoards, setAllBoards] = useState<Board[] | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const searchTerm = useSelector((state: RootState) => state.search)

    useEffect(() => {
        setIsLoading(true)
        const fetchAllBoards = async () => {
            try {
                const res = await api.get('api/boards/')
                setAllBoards(res.data)
            }
            catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchAllBoards()
    }, [])

    const boards = useMemo(() =>
        allBoards?.filter((board) => {
            const lowerSearch = searchTerm.toLowerCase();
            return board.name.toLowerCase().includes(lowerSearch)
                || board.owned_by.name.toLowerCase().includes(lowerSearch)
        }),
        [allBoards, searchTerm]
    );


    return (
        <div className="grid grid-cols-3 gap-x-4">
            {
                isLoading
                    ?
                    Array.from({ length: 6 }).map((_, index) => (
                        <BoardCardSkeleton key={index} />
                    ))
                    :
                    boards?.map(
                        (board, index) => <BoardCard board={board} key={index} />
                    )
            }
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
    )
}

export default HomePage