import { Outlet } from 'react-router-dom'
import ProtectedView from '../components/ProtectedView'

const MainLayout = () => {
    return (
        <ProtectedView>
            <main>
                <nav>Navigation</nav>
                <Outlet></Outlet>
            </main>
        </ProtectedView>
    )
}

export default MainLayout