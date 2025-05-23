import { Alert, AlertTitle, Card } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { glassyCard } from '../styles/CustomStyleMUI';
import { REFRESH_TOKEN } from '../types/Constants';


const AuthLayout = () => {
    const [isTokenValid, setIsTokenValid] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem(REFRESH_TOKEN)

        if (token) {
            const decodedToken = jwtDecode(token)
            console.log(decodedToken)
            setIsTokenValid(!(decodedToken.exp! < Date.now() / 1000))
        }
    }, [])

    return (
        <main className="flex items-center justify-center min-h-screen">
            <Card variant='outlined' sx={glassyCard}>
                <Outlet />

                {
                    isTokenValid &&
                    <Alert className="flex justify-center mt-5" variant='outlined' severity="warning">
                        <AlertTitle className='font-bold text-amber-300'>
                            Looks like you are already Logged In.
                        </AlertTitle>
                        <span className="text-amber-300">Click to go to </span>
                        <NavLink className='ms-2 text-primary fw-bold text-[17px]' to={''} >
                            👉  Home Page
                        </NavLink>
                    </Alert>
                }
            </Card>
        </main>
    )
}

export default AuthLayout