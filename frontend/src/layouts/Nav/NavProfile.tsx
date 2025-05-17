import React, { useState } from 'react';

import { Avatar, Menu, MenuItem, Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import CableIcon from '@mui/icons-material/Cable';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';

import { UserProfile } from '../../types/UserProfile';
import theme from '../../styles/MaterialTheme';
import api from '../../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../types/Constants';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCurrentUser } from '../../state/UserProfile';



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
    const logout = async () => {

        try {
            const refreshToken = localStorage.getItem(REFRESH_TOKEN);
            if (!refreshToken) {
                nav("/login");
                return;
            }
            await api.post("user/token/logout/", { refresh: refreshToken });
        }

        catch (error) {
            console.error("Failed to logout:", error);
        }

        finally {
            localStorage.removeItem(REFRESH_TOKEN);
            localStorage.removeItem(ACCESS_TOKEN);
            dispatch(clearCurrentUser())
            nav("/login");
        }
    }

    const menuOptions = [
        { label: 'Profile', icon: <FaceRetouchingNaturalIcon /> },
        { label: 'Connections', icon: <CableIcon /> },
        { label: 'Logout', icon: <LogoutIcon />, method: logout }
    ]

    return (
        <>
            <Tooltip title="Open Menu">
                <Avatar onClick={openUserMenu} src={userProfile?.image ?? ""} className='cursor-pointer'
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