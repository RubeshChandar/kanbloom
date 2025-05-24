import KanbloomLogo from '@assets/logo.png';
import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const NavBrand = () => {
    return (
        <NavLink to='/'
            className="flex flex-row items-center justify-center cursor-pointer">
            <img
                src={KanbloomLogo}
                alt="Kanbloom Logo"
                style={{
                    height: '90px',
                    display: 'block',
                    margin: 'auto',
                    transform: 'scale(10px)',
                    filter: 'drop-shadow(0 0 5px teal)',
                }}
            />
            <Typography variant='h4' padding={'10px 0px'} sx={{ fontWeight: 500 }}>
                KANBLOOM
                <Typography className='text-center text-teal-400 text-[20px]' sx={{ fontWeight: 800 }}>
                    Cultivate your workflow
                </Typography>
            </Typography>
        </NavLink >
    )
}

export default NavBrand