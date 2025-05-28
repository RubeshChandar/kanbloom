import AddIcon from '@mui/icons-material/Add';
import Backdrop from '@mui/material/Backdrop';
import Fab from '@mui/material/Fab';
import BoardEditForm from '@src/components/BoardCreateOrEditForm';
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import api from "../api";
import BoardCard from "../components/BoardCard";
import { BoardCardSkeleton } from "../components/BoardCardSkeleton";
import { RootState } from "../state/store";
import { Board } from "../types/BoardTypes";


const HomePage = () => {
    const [allBoards, setAllBoards] = useState<Board[] | null>(null)
    const [showForm, setShowForm] = useState(false)
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
        <div className="grid items-center grid-cols-3 gap-y-2 gap-x-10 justify-items-center">
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

            <Backdrop
                open={showForm}
                sx={{
                    zIndex: (theme) => theme.zIndex.modal + 1,
                    backdropFilter: 'blur(8px)',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                }}
            >
                <BoardEditForm
                    isNew={true}
                    setShowForm={setShowForm}
                />
            </Backdrop>

            <Fab
                color="secondary"
                variant="extended"
                sx={{
                    position: 'fixed',
                    bottom: 100,
                    right: 40,
                    zIndex: 1000
                }}
                onClick={() => setShowForm(true)}
            >
                <AddIcon className="font-bold" />
                <span className="font-bold ms-1"> New board</span>
            </Fab>
        </div>
    )
}

export default HomePage