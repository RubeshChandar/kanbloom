import { AppBar, Avatar, CircularProgress, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import NavBrand from './NavBrand';
import React, { useState } from 'react';
import theme from '../styles/MaterialTheme';
import LogoutIcon from '@mui/icons-material/Logout';
import CableIcon from '@mui/icons-material/Cable';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';

const NavBar = () => {
    const [anchorEl, setAnchorEL] = useState<HTMLElement | null>(null);

    const openUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEL(event.currentTarget)
    }

    const closeUserMenu = () => {
        setAnchorEL(null)
    }

    const menuOptions = [
        { label: 'Profile', icon: <FaceRetouchingNaturalIcon /> },
        { label: 'Connections', icon: <CableIcon /> },
        { label: 'Logout', icon: <LogoutIcon /> },
    ]

    const { isLoading, currentUser } = useSelector((state: RootState) => state.currentUser)
    return (
        <nav>
            <AppBar position='static'>
                <Toolbar className="flex justify-between">
                    <NavBrand />

                    <div className="flex flex-row items-center justify-center">
                        <Typography variant='h5' padding={'10px 20px'} fontWeight={"bold"}>
                            Hello, {currentUser?.user.username}
                            <Typography className='text-teal-400'>
                                Member since
                                <span className="ml-1.5 font-bold">
                                    {currentUser?.user.date_joined}
                                </span>
                            </Typography>
                        </Typography>


                        {
                            isLoading ?
                                <CircularProgress color="secondary" />
                                :
                                <>
                                    <Tooltip title="Open Menu">
                                        <Avatar onClick={openUserMenu} src={currentUser?.image ?? ""} className='cursor-pointer'
                                            sx={{ width: 55, height: 55 }} />
                                    </Tooltip>

                                    <Menu
                                        sx={{
                                            mt: '1px',
                                            '& .MuiPaper-root': {
                                                fontWeight: 'bold',
                                                backgroundColor: theme.palette.custom.blueey,
                                            },
                                            '& .MuiMenuItem-root': {
                                                padding: '8px 15px',
                                                display: 'flex',
                                                gap: '10px',
                                                alignItems: 'center',
                                                '&:hover': {
                                                    backgroundColor: theme.palette.primary.main,
                                                    color: 'white'
                                                },
                                            },
                                        }}
                                        disableAutoFocusItem
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={closeUserMenu}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'center',
                                        }}>

                                        {
                                            menuOptions.map((item, index) => (
                                                <MenuItem key={index}>
                                                    {item.icon}
                                                    {item.label}
                                                </MenuItem>
                                            ))
                                        }
                                    </Menu>
                                </>
                        }
                    </div>
                </Toolbar>
            </AppBar>
        </nav>
    )
}

export default NavBar