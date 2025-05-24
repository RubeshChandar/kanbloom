import { Outlet } from 'react-router-dom'
import ProtectedView from './ProtectedView'
import NavBar from './Nav/NavBar'

const MainLayout = () => {
    return (
        <ProtectedView>
            <main>
                <NavBar />
                <div className="mt-8 px-5">
                    <Outlet></Outlet>
                </div>
            </main>
        </ProtectedView>
    )
}

export default MainLayout