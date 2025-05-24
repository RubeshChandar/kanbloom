import Skeleton from '@mui/material/Skeleton';


export const BoardCardSkeleton = () => {
    return (
        <div className="flex flex-col p-5 my-6 border border-white bg-neon/10 rounded-xl w-100">
            <div className="p-4">
                <Skeleton variant="text" width="60%" height={32} sx={{ bgcolor: 'grey.800' }} />

                <table className='w-full my-5 border-separate border-spacing-1.5'>
                    <thead>
                        <tr className='text-[18px]'>
                            <th className='text-start'>STATUS</th>
                            <th className='text-center'>PERCENTAGE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 4 }).map((_, idx) => (
                            <tr key={idx}>
                                <td><Skeleton variant="text" width={100} sx={{ bgcolor: 'grey.800' }} /></td>
                                <td><Skeleton variant="rectangular" width="100%" height={20} sx={{ bgcolor: 'grey.800' }} /></td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={2} className='text-center'>
                                <Skeleton variant="text" width="50%" sx={{ bgcolor: 'grey.800' }} />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="grid grid-cols-2 mt-4">
                    <Skeleton variant="text" width="60%" sx={{ bgcolor: 'grey.800' }} />
                    <div className="flex justify-end">
                        {Array.from({ length: 3 }).map((_, idx) => (
                            <Skeleton key={idx} variant="circular" width={40} height={40} sx={{ bgcolor: 'grey.800', marginLeft: 1 }} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="px-1 pt-2 pb-3 mx-3 border-t border-white-300">
                <Skeleton variant="text" width="40%" sx={{ bgcolor: 'grey.800' }} />
            </div>
        </div>
    );
}