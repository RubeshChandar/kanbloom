import { AppBar, CircularProgress, Toolbar, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import NavBrand from './NavBrand';
import NavProfile from './NavProfile';
import NavSearch from './NavSearch';


const NavBar = () => {
    const { isLoading, currentUser } = useSelector((state: RootState) => state.currentUser)

    return (
        <nav>
            <AppBar position='static'>
                <Toolbar className="flex justify-between">
                    <NavBrand />
                    <NavSearch />
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