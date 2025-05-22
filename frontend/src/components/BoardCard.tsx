import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import LinearProgressWithLabel from "./LinearProgressWithLabel"
import { TaskStatusLabel, TBoardCard } from '../types/BoardTypes';
import { Chip, Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';


const BoardCard = ({ board }: { board: TBoardCard }) => {

    let totalTask = 0;
    const { currentUser } = useSelector((state: RootState) => state.currentUser)
    const isOwner = (board.owned_by.id) === currentUser?.user.id

    board.taskStatus?.map((task) => totalTask = totalTask + task.count)

    return (

        <div className="flex flex-col my-6 bg-neon/10 border hover:border-neon border-white p-5 rounded-xl w-100">
            <div className="p-4">

                <h5 className="mb-3 text-2xl text-teal-400 font-semibold">
                    {board.name}
                    {isOwner &&
                        <span className="ms-3 px-2 py-1 rounded-full bg-yellow-300 text-black text-xs font-bold inline-block transform -translate-y-1">
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
                            board.taskStatus?.map((taskStatus) => {
                                const progress = totalTask > 0 ? Math.round((taskStatus.count / totalTask) * 100) : 0;
                                return (
                                    <tr key={taskStatus.status}>
                                        <td className='font-bold uppercase'>{TaskStatusLabel[taskStatus.status]}</td>
                                        <td className='text-center'>
                                            <LinearProgressWithLabel value={progress} />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        <tr key="TOTAL">
                            <td colSpan={2} className='text-center text-teal-400 font-bold'>
                                There are a total of
                                <span className="text-red-400 text-[20px] mx-1 align-baseline">{totalTask}</span>
                                Tasks
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="mt-4 grid grid-cols-2 cursor-pointer">
                    <a className="text-neon font-bold hover:underline flex items-center">
                        Explore More
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
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

            <div className="mx-3 border-t border-white-300 pb-3 pt-2 px-1">
                <span className="text-sm text-red-400 font-medium">
                    Last updated: {board.lastUpdated}
                </span>
            </div>
        </div>

    )
}

export default BoardCard