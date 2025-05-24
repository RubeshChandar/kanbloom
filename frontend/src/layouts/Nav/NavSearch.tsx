import command from '@assets/command.svg';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setSearchTerm } from '../../state/SearchBarSlice';
import { AppDispatch } from '../../state/store';
import theme from '../../styles/MaterialTheme';

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


const NavSearch = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [search, setSearch] = useState('');

    const dispatch = useDispatch<AppDispatch>()
    const location = useLocation()

    useEffect(() => {
        setSearch('');
        dispatch(setSearchTerm(''))
    }, [location.pathname, dispatch])

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

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        dispatch(setSearchTerm(e.target.value))
    }

    return (
        <TextField className='w-100'
            placeholder='Search...'
            sx={sxProps}
            inputRef={inputRef}
            value={search}
            onChange={onSearchChange}
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
    )
}

export default NavSearch