import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import React from 'react';

// Encoded white eye SVG icon (open eye)
const openEyeIcon = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm7.5 0C20.94 7.61 16.94 4.5 12 4.5S3.06 7.61 1.5 12c1.56 4.39 5.56 7.5 10.5 7.5s8.94-3.11 10.5-7.5z"/></svg>`
);

// Encoded white slashed eye SVG icon (hidden eye)
const slashedEyeIcon = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3l18 18m-3.88-3.88A8.94 8.94 0 0112 19.5c-5 0-9-4.03-10.5-7.5a16.06 16.06 0 013.29-4.74m3.65-2.5A8.94 8.94 0 0112 4.5c5 0 9 4.03 10.5 7.5a15.94 15.94 0 01-4.21 5.05M9.88 9.88A3 3 0 0112 9c1.66 0 3 1.34 3 3 0 .35-.06.68-.17.99m-1.6 1.6A3.01 3.01 0 0112 15a3 3 0 01-3-3c0-.35.06-.68.17-.99"/></svg>`
);

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url("data:image/svg+xml;utf8,${openEyeIcon}")`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: '#aab4be',
                ...(theme.palette.mode === 'dark' && {
                    backgroundColor: '#8796A5',
                }),
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: '#001e3c',
        width: 32,
        height: 32,
        position: 'relative',
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
        },
        ...(theme.palette.mode === 'dark' && {
            backgroundColor: '#003892',
        }),
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
        borderRadius: 20 / 2,
        ...(theme.palette.mode === 'dark' && {
            backgroundColor: '#8796A5',
        }),
    },
}));

interface PwdSwitchProps {
    checked: boolean,
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
    sx?: object,
}

const PwdSwitch: React.FC<PwdSwitchProps> = ({ checked, setShowPassword, sx }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <MaterialUISwitch
                checked={checked}
                onChange={() => { setShowPassword(!checked) }}
                sx={{
                    '& .MuiSwitch-thumb:before': {
                        backgroundImage: checked
                            ? `url("data:image/svg+xml;utf8,${openEyeIcon}")`
                            : `url("data:image/svg+xml;utf8,${slashedEyeIcon}")`,
                    },
                    ...sx,
                }}
            />
            <span style={{ color: '#6b7280' }}>{checked ? 'Hide Passwords' : 'Show Passwords'}</span>
        </div>
    );
};

export default PwdSwitch;