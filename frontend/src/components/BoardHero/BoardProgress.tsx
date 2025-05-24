import { CircularProgressWithLabel } from "@src/utils/ProgressWithLabel";
import { TaskCount } from "@src/types/BoardTypes";


const BoardProgress = ({ taskCount, totalTasks }: { taskCount: TaskCount, totalTasks: number }) => {
    return (
        <table className="text-center">
            <thead>
                <tr className="text-teal-400 text-xl font-bold">
                    <th className="py-2 px-5">TO DO</th>
                    <th className="py-2 px-5">IN PROGRESS</th>
                    <th className="py-2 px-5">BLOCKED</th>
                    <th className="py-2 px-5">DONE</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    {
                        (["TODO", "INPROGRESS", "BLOCKED", "DONE"] as (keyof TaskCount)[]).map((status) => {
                            const val = (taskCount[status] / totalTasks) * 100
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