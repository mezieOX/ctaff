import axios from "axios";

export const setTokenCookie = async(accessToken: string, refreshToken: string, role?: string) => {
    return await axios.post("/api/auth/set_tokens", {accessToken, refreshToken})
};

export const getTokenCookie = async() => {
    const res = await axios.get("/api/auth/get_tokens")
    return res.data
};