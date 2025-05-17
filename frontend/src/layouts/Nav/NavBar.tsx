import { AppBar, CircularProgress, InputAdornment, TextField, Toolbar, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import NavBrand from './NavBrand';
import NavProfile from './NavProfile';
import theme from '../../styles/MaterialTheme';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useRef, useState } from 'react';
import command from '@assets/command.svg';


const sxProps = {
    '& .MuiOutlinedInput-root': {
        backgroundColor: 'black', // Background color for the entire input field
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.custom.neon, // focused border color
        },
        borderRadius: '50px'
    },
    '& input': {
        color: theme.palette.text.primary, // input text color
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'black', // default border color
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.text.primary, // hover border color
    },
}

const NavBar = () => {
    const { isLoading, currentUser } = useSelector((state: RootState) => state.currentUser)
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        const handleShortcut = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault();

                if (isFocused) {
                    inputRef.current?.blur();
                } else {
                    inputRef.current?.focus();
                }

                setIsFocused(!isFocused);
            }
        };

        window.addEventListener('keydown', handleShortcut);
        return () => window.removeEventListener('keydown', handleShortcut);
    }, [isFocused]);
    return (
        <nav>
            <AppBar position='static'>
                <Toolbar className="flex justify-between">
                    <NavBrand />

                    <TextField className='w-100'
                        placeholder='Search...'
                        sx={sxProps}
                        inputRef={inputRef}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: theme.palette.custom.neon }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position='end'
                                        sx={{ display: 'flex', alignItems: 'center', gap: '4px' }} className='pr-3'>
                                        <img src={command} style={{ filter: 'brightness(0) invert(1)', height: '18px' }} />
                                        <span style={{ color: 'white', fontWeight: 'bold' }}>K</span>
                                    </InputAdornment>
                                )
                            }
                        }}
                    />

                    <div className="flex flex-row items-center justify-center">
                        <Typography variant='h5' padding={'10px 20px'} fontWeight={"bold"}>
                            Hello, {currentUser?.user.username}
                            <p className='text-teal-400 text-[20px]'>
                                {currentUser?.title}
                            </p>
                        </Typography>
                        {
                            isLoading ?
                                <CircularProgress color="secondary" /> :
                                <NavProfile userProfile={currentUser!} />
                        }
                    </div>
                </Toolbar>
            </AppBar>
        </nav>
    )
}

export default NavBar