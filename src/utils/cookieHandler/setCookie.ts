import cookie from "cookie"
import { NextApiResponse } from "next";

export async function setCookieToResponseHeader(res: NextApiResponse, refresh_token: string, access_tpken: string) {
    const rt = cookie.serialize(
        'refreshToken',
        refresh_token,
        {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            path: "/",
        }
    )
    
    const at = cookie.serialize(
        'accessToken',
        access_tpken,
        {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            path: "/",
        }
    )
    
    res.setHeader(
        "Set-Cookie",
        [rt, at]
    );
}
