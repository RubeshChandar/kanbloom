import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import LinearProgressWithLabel from "./LinearProgressWithLabel"

const BoardCard = () => {
    const taskStatus = {
        "To Do": 10,
        "In Progress": 65,
        "Blocked": 10,
        "Done": 15,
    }
    return (
        <div className="flex flex-col my-6 bg-neon/10 border hover:border-neon border-white p-5 rounded-xl w-100">
            <div className="p-4">
                <h5 className="mb-2 text-2xl text-teal-400 font-semibold">
                    Website Review
                </h5>

                <table className='w-full my-5 border-separate border-spacing-1.5'>
                    <thead>
                        <tr className='text-[18px]' >
                            <th className='text-start'>STATUS</th>
                            <th className='text-center'>PERCENTAGE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.entries(taskStatus).map(([status, count]) => (
                                <tr key={status}>
                                    <td className='font-bold uppercase'>{status}</td>
                                    <td className='text-center'>
                                        <LinearProgressWithLabel value={count} />
                                    </td>
                                </tr>
                            ))
                        }
                        <tr key="TOTAL">
                            <td colSpan={2} className='text-center text-teal-400 font-bold'>
                                There are a total of
                                <span className="text-red-400 text-[20px] mx-1 align-baseline">100</span>
                                Tasks
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="mt-4 grid grid-cols-2">
                    <a href="" className="text-neon font-bold hover:underline flex items-center">
                        Explore More
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                    <AvatarGroup max={3} spacing={'medium'}>
                        <Avatar alt="Travis Howard" src="http://127.0.0.1:8000/media/profile_pictures/rubesh.jpeg" />
                        <Avatar alt="Agnes Walker" src="http://127.0.0.1:8000/media/profile_pictures/raveena_oEnLdpC.jpeg" />
                        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                    </AvatarGroup>
                </div>

            </div>

            <div className="mx-3 border-t border-white-300 pb-3 pt-2 px-1">
                <span className="text-sm text-red-400 font-medium">
                    Last updated: 4 hours ago
                </span>
            </div>
        </div>
    )
}

export default BoardCard