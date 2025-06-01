import { SxProps, Theme } from "@mui/material"
import theme from "./MaterialTheme"

export const glassyCard: SxProps<Theme> = {
    backgroundColor: 'rgb(255 255 255 / 0%);',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    borderRadius: '18px',
    p: 5,
    color: 'white'
}


export const TextFieldStyle: SxProps<Theme> = {
    backgroundColor: 'black', // Input background color

    // Input text styling
    '& .MuiOutlinedInput-input': {
        color: theme.palette.custom.neon,
    },
    // Label default styling
    '& .MuiInputLabel-root': {
        fontSize: '1.1rem', // Increase label font size
        color: 'white',     // White color when not focused
        fontWeight: 800,
    },
    // Label color on focus
    '& .MuiInputLabel-root.Mui-focused': {
        color: theme.palette.custom.neon,
    },
    // Border color on hover
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
    },
    // Border color on focus
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.custom.neon,
    },
}

export const MenuStyle = {
    paper: {
        sx: {
            minWidth: 180,
            bgcolor: theme.palette.custom.blueey,
            color: "#fff",
            boxShadow: "0 2px 14px 2px rgba(0,0,0,0.25)",
            zIndex: 1401,
            "& .MuiMenuItem-root": {
                "&.Mui-selected, &:hover": {
                    bgcolor: "#232526",
                    color: "#fff"
                }
            }
        }
    }
}