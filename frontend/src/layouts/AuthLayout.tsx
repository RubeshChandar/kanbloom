import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
    return (
        <main className="flex items-center justify-center min-h-screen">
            <Outlet />
        </main>
    )
}

export default AuthLayout