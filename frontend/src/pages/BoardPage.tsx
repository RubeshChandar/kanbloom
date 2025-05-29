import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import DnD from '@src/components/Drag-N-Drop/DnD';
import theme from '@src/styles/MaterialTheme';
import { useParams } from "react-router-dom";
import BoardHero from "../components/BoardHero/BoardHero";

const BoardPage = () => {
    const { slug } = useParams<{ slug: string }>();

    return (
        <>
            <Accordion
                // defaultExpanded
                sx={{
                    background: "transparent",
                    borderRadius: 3,
                    border: "none"
                }}>
                <AccordionSummary sx={{
                    background: theme.palette.custom.neon,
                    color: "#171717",
                    fontWeight: "bold",
                    fontSize: "2rem",
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                    boxShadow: "0 2px 12px 0 rgba(0,0,0,0.10)",
                    minHeight: 64,
                    '& .MuiAccordionSummary-content': {
                        margin: 0,
                    }
                }}
                    expandIcon={<ExpandMoreIcon />}
                >
                    <h2 className="text-2xl font-bold">Board Details</h2>
                </AccordionSummary>
                <AccordionDetails sx={{
                    background: "rgba(17,17,17,0.96)",
                    borderBottomLeftRadius: 12,
                    borderBottomRightRadius: 12,
                    border: "1px solid #333",
                    borderTop: "none",
                    boxShadow: "0 4px 24px 0 rgba(0,0,0,0.15)",
                }}>
                    <BoardHero slug={slug!} />
                </AccordionDetails >
            </Accordion >
            <div className="mt-5">
                <DnD slug={slug!} />
            </div>
        </>
    )

}

export default BoardPage