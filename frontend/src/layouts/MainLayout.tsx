import { Outlet } from 'react-router-dom'
import NavBar from './Nav/NavBar'
import ProtectedView from './ProtectedView'

const MainLayout = () => {
    return (
        <ProtectedView>
            <main>
                <NavBar />
                <div className="px-5 mt-8">
                    <Outlet></Outlet>
                </div>
            </main>
        </ProtectedView>
    )
}

export default MainLayout