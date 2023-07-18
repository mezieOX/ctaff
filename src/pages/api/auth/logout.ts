import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import cookie from "cookie"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const url = process.env.API_URL;
    const { cookies } = req
    const { refreshToken, accessToken } = cookies

    try {
        const response = await axios.post(`${url}/auth/logout`, {}, {
            headers: {
                authorization: `Bearer ${accessToken}` as string,
                refresh_token: refreshToken as string,
            }
        });
        const rt = cookie.serialize(
            'refreshToken',
        "",
            {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                maxAge: -1,
                sameSite: "strict",
                path: "/",
            }
        )

        const at = cookie.serialize(
            'accessToken',
            "",
            {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                maxAge: -1,
                sameSite: "strict",
                path: "/",
            }
        )

        res.setHeader(
            "Set-Cookie",
            [rt, at]
        );
        res.status(response.status).json(response.data);
    } catch (error: any) {
        console.log(error)
        res.status(error?.response?.status).json(error.response.data);
    }
}