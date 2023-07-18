import cookie from "cookie"
import { NextApiResponse } from "next";

export async function deleteTokensInCookies(res: NextApiResponse) {
    const rt = cookie.serialize(
        'refreshToken',
        '',
        {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            path: "/",
            maxAge: -1,
        }
    )

    const at = cookie.serialize(
        'accessToken',
        '',
        {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            path: "/",
            maxAge: -1,
        }
    )

    res.setHeader(
        "Set-Cookie",
        [rt, at]
    );
}
