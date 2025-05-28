import { TaskCount } from "@src/types/BoardTypes";
import { CircularProgressWithLabel } from "@src/utils/ProgressWithLabel";


const BoardProgress = ({ taskCount, totalTasks }: { taskCount: TaskCount, totalTasks: number }) => {
    return (
        <table className="w-full text-center">
            <thead>
                <tr className="text-xl font-bold text-teal-400">
                    <th className="px-5 py-2">TO DO</th>
                    <th className="px-5 py-2">IN PROGRESS</th>
                    <th className="px-5 py-2">BLOCKED</th>
                    <th className="px-5 py-2">DONE</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    {
                        (["TODO", "INPROGRESS", "BLOCKED", "DONE"] as (keyof TaskCount)[]).map((status) => {
                            let val = (taskCount[status] / totalTasks) * 100
                            if (totalTasks === 0) val = 0;
                            return (
                                <td className="py-4" key={status}>
                                    <CircularProgressWithLabel
                                        value={val}
                                        size="55px"
                                    />
                                </td>
                            )
                        })
                    }
                </tr>
            </tbody>
        </table>
    )
}

export default BoardProgress