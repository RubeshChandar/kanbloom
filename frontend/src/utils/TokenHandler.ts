import { Dispatch } from "@reduxjs/toolkit"
import api from "@src/api"
import { clearCurrentUser } from "@src/state/UserProfile"
import { NavigateFunction } from "react-router-dom"
import { AuthToken } from "../types/AuthTypes"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../types/Constants"

export const ClearTokens = () => {
    localStorage.removeItem(REFRESH_TOKEN)
    localStorage.removeItem(ACCESS_TOKEN)
}

export const SetTokens = (tokens: AuthToken) => {
    localStorage.setItem(ACCESS_TOKEN, tokens.access);
    localStorage.setItem(REFRESH_TOKEN, tokens.refresh!)
}

export const logout = async (nav: NavigateFunction, dispatch: Dispatch) => {
    try {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        if (!refreshToken) {
            nav("/login");
            return;
        }
        await api.post("user/token/logout/", { refresh: refreshToken });
    }

    catch (error) {
        console.error("Failed to logout:", error);
    }

    finally {
        ClearTokens()
        dispatch(clearCurrentUser())
        nav("/login");
    }
}