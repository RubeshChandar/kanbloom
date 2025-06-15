import { NavLink } from "react-router-dom"

const NotFoundPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white px-4">
            <div className="text-center">
                <h1 className="text-6xl font-extrabold mb-4">404</h1>
                <p className="text-xl mb-6">Oops! The page you're looking for doesn't exist.</p>
                <NavLink to="/" className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold transition">
                    Go back home
                </NavLink>
            </div>
        </div>
    )
}

export default NotFoundPage