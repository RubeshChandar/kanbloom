import { Chip, Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { TaskStatusLabel } from '@src/types/TaskTypes';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../state/store';
import { Board, TaskCount } from '../types/BoardTypes';
import { LinearProgressWithLabel } from "../utils/ProgressWithLabel";


const BoardCard = ({ board }: { board: Board }) => {

    const { currentUser } = useSelector((state: RootState) => state.currentUser)
    const isOwner = (board.owned_by.id) === currentUser?.user.id

    return (

        <div className="flex flex-col p-5 my-6 border border-white bg-neon/10 hover:border-neon rounded-xl w-100">
            <div className="p-4">

                <h5 className="mb-3 text-2xl font-semibold text-teal-400">
                    {board.name}
                    {isOwner &&
                        <span className="inline-block px-2 py-1 text-xs font-bold text-black transform -translate-y-1 bg-yellow-300 rounded-full ms-3">
                            Owner
                        </span>
                    }
                </h5>

                <Chip
                    avatar={<Avatar src={board.owned_by.imageURL} />}
                    label={board.owned_by.name}
                    variant="outlined"
                />

                <table className='w-full my-5 border-separate border-spacing-1.5'>
                    <thead>
                        <tr className='text-[18px]' >
                            <th className='text-start'>STATUS</th>
                            <th className='text-center'>PERCENTAGE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (["TODO", "INPROGRESS", "BLOCKED", "DONE"] as (keyof TaskCount)[]).map((status) => {
                                const progress = board.totalTasks ? Math.round((board.taskCount[status] / board.totalTasks) * 100) : 0;
                                return (
                                    <tr key={status}>
                                        <td className='font-bold uppercase'>{TaskStatusLabel[status]}</td>
                                        <td className='text-center'>
                                            <LinearProgressWithLabel value={progress} />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        <tr key="TOTAL">
                            <td colSpan={2} className='font-bold text-center text-teal-400'>
                                There are a total of
                                <span className="text-red-400 text-[20px] mx-1 align-baseline">{board.totalTasks}</span>
                                Tasks
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="grid grid-cols-2 mt-4 cursor-pointer">
                    <Link to={`/boards/${board.slug}`} className="flex items-center font-bold text-neon hover:underline">
                        Explore More
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                    <AvatarGroup max={4} spacing='medium'>
                        {
                            board.members.map(member => {
                                if (member.imageURL) {
                                    return (
                                        <Tooltip title={member.name} arrow >
                                            <Avatar key={member.name} src={member.imageURL} />
                                        </Tooltip>
                                    )
                                } else {
                                    const initials = member.name.charAt(0).toUpperCase();
                                    return (
                                        <Tooltip title={member.name} arrow>
                                            <Avatar key={member.name} alt={member.name}>{initials}</Avatar>
                                        </Tooltip>
                                    );
                                }
                            }
                            )
                        }
                    </AvatarGroup>
                </div>

            </div>

            <div className="px-1 pt-2 pb-3 mx-3 border-t border-white-300">
                <span className="text-sm font-medium text-red-400">
                    Last updated: {board.lastUpdated}
                </span>
            </div>
        </div>

    )
}

export default BoardCard