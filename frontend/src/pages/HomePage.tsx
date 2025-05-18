import BoardCard from "../components/BoardCard"

const HomePage = () => {
    const temp = [1, 3, 4, 56, 7,]

    return (
        <>
            <div className="grid grid-cols-4 gap-x-10">
                {temp.map((index) => <BoardCard key={index}></BoardCard>)}
            </div>
        </>
    )
}

export default HomePage