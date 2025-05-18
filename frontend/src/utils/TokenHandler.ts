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