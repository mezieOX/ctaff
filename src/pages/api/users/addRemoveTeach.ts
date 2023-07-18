import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import cookie from "cookie"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const url = process.env.API_URL;
    const { cookies } = req
    const { refreshToken, accessToken } = cookies

    try {
        const response = await axios.post(`${url}/users/addRemoveTeach`, { ...req.body }, {
            headers: {
                authorization: `Bearer ${accessToken}` as string,
                refresh_token: refreshToken as string,
            }
        });

        // const { authorization, refresh_token } = response.headers;
        // const aT = authorization.replace("Bearer", "").trim();

        // const rt = cookie.serialize(
        //     'refreshToken',
        //     refresh_token,
        //     {
        //         httpOnly: true,
        //         secure: process.env.NODE_ENV !== "development",
        //         // maxAge: expiresIn,
        //         sameSite: "strict",
        //         path: "/",
        //     }
        // )

        // const at = cookie.serialize(
        //     'accessToken',
        //     aT,
        //     {
        //         httpOnly: true,
        //         secure: process.env.NODE_ENV !== "development",
        //         // maxAge: expiresIn,
        //         sameSite: "strict",
        //         path: "/",
        //     }
        // )

        // res.setHeader(
        //     "Set-Cookie",
        //     [rt, at]
        // );

        res.status(response.status).json(response.data);
    } catch (error: any) {
        res.status(error?.response?.status).json(error?.response?.data);
    }
}