import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../types/Constants";
import { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';

const ProtectedView = ({ children }: { children: React.ReactNode }) => {
    const [isAuthorised, setIsAuthorised] = useState<boolean | null>(null);

    useEffect(() => {
        const auth = async () => {
            const token = localStorage.getItem(ACCESS_TOKEN)

            if (!token) {
                setIsAuthorised(false)
                return
            }

            const decoded: { exp: number } = jwtDecode(token);
            const tokenExpiration = decoded.exp;
            const now = Date.now() / 1000;

            if (tokenExpiration < now) {
                await refreshToken();
            } else {
                setIsAuthorised(true)
            }
        }

        auth().catch(() => setIsAuthorised(false))
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)

        try {
            const res = await api.post("/user/token/refresh/", {
                refresh: refreshToken
            })

            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorised(true)
            }
            else {
                setIsAuthorised(false)
            }
        }
        catch (error) {
            console.log(error)
            setIsAuthorised(false)
        }
    }


    if (isAuthorised === null) {
        return <CircularProgress />
    }

    return (
        isAuthorised ? children : <Navigate to='/login' replace />
    )
}

export default ProtectedView
