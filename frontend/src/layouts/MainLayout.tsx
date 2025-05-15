import { Outlet } from 'react-router-dom'
import ProtectedView from '../components/ProtectedView'
import NavBar from './NavBar'

const MainLayout = () => {
    return (
        <ProtectedView>
            <main>
                <NavBar />
                <Outlet></Outlet>
            </main>
        </ProtectedView>
    )
}

export default MainLayout