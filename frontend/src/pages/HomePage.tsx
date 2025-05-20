import BoardCard from "../components/BoardCard"
import { TBoardCard, TaskStatus } from "../types/BoardTypes"
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const HomePage = () => {
    const temp: TBoardCard[] = [
        {
            id: "project-alpha",
            name: "Project Alpha",
            lastUpdated: "10 Seconds Ago",
            taskStatus: [
                { status: TaskStatus.TO_DO, count: 5 },
                { status: TaskStatus.IN_PROGRESS, count: 2 },
                { status: TaskStatus.BLOCKED, count: 0 },
                { status: TaskStatus.DONE, count: 3 },
            ],
            members: [
                { name: "Rubesh", imageURL: "http://127.0.0.1:8000/media/profile_pictures/rubesh.jpeg" },
                { name: "Raveena", imageURL: "http://127.0.0.1:8000/media/profile_pictures/raveena_oEnLdpC.jpeg" },
                { name: "John", imageURL: "https://randomuser.me/api/portraits/men/1.jpg" },
                { name: "Emma", imageURL: "https://randomuser.me/api/portraits/women/8.jpg" }
            ]
        },
        {
            id: "kanbloom-ui",
            name: "Kanbloom UI",
            lastUpdated: "5 Minutes Ago",
            taskStatus: [
                { status: TaskStatus.TO_DO, count: 8 },
                { status: TaskStatus.IN_PROGRESS, count: 4 },
                { status: TaskStatus.BLOCKED, count: 0 },
                { status: TaskStatus.DONE, count: 6 },
            ],
            members: [
                { name: "Alice", imageURL: "https://randomuser.me/api/portraits/women/2.jpg" },
                { name: "Rubesh", imageURL: "http://127.0.0.1:8000/media/profile_pictures/rubesh.jpeg" },
                { name: "Raveena", imageURL: "http://127.0.0.1:8000/media/profile_pictures/raveena_oEnLdpC.jpeg" },
                { name: "Sophia", imageURL: "https://randomuser.me/api/portraits/women/5.jpg" },
                { name: "Olivia", imageURL: "https://randomuser.me/api/portraits/women/9.jpg" }
            ]
        },
        {
            id: "backend-api",
            name: "Backend API",
            lastUpdated: "30 Minutes Ago",
            taskStatus: [
                { status: TaskStatus.TO_DO, count: 0 },
                { status: TaskStatus.IN_PROGRESS, count: 3 },
                { status: TaskStatus.BLOCKED, count: 0 },
                { status: TaskStatus.DONE, count: 7 },
            ],
            members: [
                { name: "Raveena", imageURL: "http://127.0.0.1:8000/media/profile_pictures/raveena_oEnLdpC.jpeg" },
                { name: "Mike", imageURL: "https://randomuser.me/api/portraits/men/3.jpg" },
                { name: "Emma", imageURL: "https://randomuser.me/api/portraits/women/4.jpg" },
                { name: "Sophia", imageURL: "https://randomuser.me/api/portraits/women/5.jpg" },
                { name: "John", imageURL: "https://randomuser.me/api/portraits/men/7.jpg" },
                { name: "Olivia", imageURL: "https://randomuser.me/api/portraits/women/9.jpg" }
            ]
        },
        {
            id: "marketing-plan",
            name: "Marketing Plan",
            lastUpdated: "2 Hours Ago",
            taskStatus: [
                { status: TaskStatus.TO_DO, count: 10 },
                { status: TaskStatus.IN_PROGRESS, count: 0 },
                { status: TaskStatus.BLOCKED, count: 2 },
                { status: TaskStatus.DONE, count: 0 },
            ],
            members: [
                { name: "Sophia", imageURL: "https://randomuser.me/api/portraits/women/5.jpg" },
                { name: "Rubesh", imageURL: "http://127.0.0.1:8000/media/profile_pictures/rubesh.jpeg" },
                { name: "Alice", imageURL: "https://randomuser.me/api/portraits/women/2.jpg" },
                { name: "James", imageURL: "https://randomuser.me/api/portraits/men/6.jpg" },
                { name: "Emma", imageURL: "https://randomuser.me/api/portraits/women/4.jpg" }
            ]
        },
        {
            id: "design-system",
            name: "Design System",
            lastUpdated: "Yesterday",
            taskStatus: [
                { status: TaskStatus.TO_DO, count: 15 },
                { status: TaskStatus.IN_PROGRESS, count: 5 },
                { status: TaskStatus.BLOCKED, count: 0 },
                { status: TaskStatus.DONE, count: 12 },
            ],
            members: [
                { name: "James", imageURL: "https://randomuser.me/api/portraits/men/6.jpg" },
                { name: "Raveena", imageURL: "" },
                { name: "Olivia", imageURL: "https://randomuser.me/api/portraits/women/7.jpg" },
                { name: "Mike", imageURL: "https://randomuser.me/api/portraits/men/3.jpg" },
                { name: "Alice", imageURL: "https://randomuser.me/api/portraits/women/2.jpg" },
                { name: "Emma", imageURL: "https://randomuser.me/api/portraits/women/4.jpg" }
            ]
        }
    ];

    return (
        <>
            <div className="grid grid-cols-3 gap-x-4">
                {temp.map((board, index) => <BoardCard board={board} key={index}></BoardCard>)}
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
        </>
    )
}

export default HomePage