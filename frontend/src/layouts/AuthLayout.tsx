import { Outlet } from 'react-router-dom'
import { glassyCard } from '../styles/CustomStyleMUI';
import { Card } from '@mui/material';


const AuthLayout = () => {
    return (
        <main className="flex items-center justify-center min-h-screen">
            <Card variant='outlined' sx={glassyCard}>
                <Outlet />
            </Card>
        </main>
    )
}

export default AuthLayout