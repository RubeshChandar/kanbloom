import { createTheme } from '@mui/material/styles';

// Extend MUI's Palette type
declare module '@mui/material/styles' {
    interface Palette {
        custom: {
            neon: string;
            blueey: string;
        };
    }
    interface PaletteOptions {
        custom?: {
            neon: string;
            blueey: string;
        };
    }
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#9B5DE5',
            dark: '#6B3BB5',

        },
        secondary: {
            main: '#F9FAFB',
        },
        text: {
            primary: '#F9FAFB',
            secondary: '#6B7280',
        },
        background: {
            default: '#000000',
            paper: '#ECEFF4',
        },
        custom: {
            neon: '#C3FF00',
            blueey: '#3B4B5A',
        },
        action: {
            disabled: '#BBA6E7',
            disabledBackground: '#3B2B59',
        },
    },
});

export default theme;