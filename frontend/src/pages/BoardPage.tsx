import { useParams } from "react-router-dom";
import BoardHero from "../components/BoardHero/BoardHero";

const BoardPage = () => {
    const { slug } = useParams<{ slug: string }>();

    return (
        <>
            <BoardHero slug={slug!} />
        </>
    )

}

export default BoardPage