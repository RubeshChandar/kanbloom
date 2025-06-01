import React, { useState } from 'react';

import CableIcon from '@mui/icons-material/Cable';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, Menu, MenuItem, Tooltip } from '@mui/material';

import theme from '@src/styles/MaterialTheme';
import { UserProfile } from '@src/types/UserProfile';
import { logout } from '@src/utils/TokenHandler';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const NavProfile = ({ userProfile }: { userProfile: UserProfile; }) => {
    const [anchorEl, setAnchorEL] = useState<HTMLElement | null>(null);
    const openUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEL(event.currentTarget)
    }
    const closeUserMenu = () => {
        setAnchorEL(null)
    }

    const nav = useNavigate()
    const dispatch = useDispatch()

    const menuOptions = [
        { label: 'Profile', icon: <FaceRetouchingNaturalIcon />, method: () => { nav("/profile") } },
        { label: 'Connections', icon: <CableIcon /> },
        { label: 'Logout', icon: <LogoutIcon />, method: () => logout(nav, dispatch) }
    ]

    return (
        <>
            <Tooltip title="Open Menu">
                <Avatar onClick={openUserMenu} src={userProfile?.imageURL ?? ""} className='cursor-pointer'
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
                        <MenuItem key={index} onClick={() => {
                            item.method?.();  // Call the method if it exists
                            closeUserMenu(); // Close the menu after clicking
                        }}>
                            {item.icon}
                            {item.label}
                        </MenuItem>
                    ))
                }
            </Menu>
        </>
    )
}

export default NavProfile