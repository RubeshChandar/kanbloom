import { SxProps, Theme } from "@mui/material"

export const glassyCard: SxProps<Theme> = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    borderRadius: '16px',
    p: 3,
    color: 'white'
}