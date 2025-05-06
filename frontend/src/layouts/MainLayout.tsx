import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <main>
            <nav>Navigation</nav>
            <Outlet></Outlet>
        </main>
    )
}

export default MainLayout