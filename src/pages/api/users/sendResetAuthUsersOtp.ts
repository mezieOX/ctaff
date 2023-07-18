import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const url = process.env.API_URL;
    const { cookies } = req
    const { refreshToken, accessToken } = cookies

    try {
        const response = await axios.get(`${url}/users/sendResetAuthUsersOtp`, { 
            headers: {
                authorization: `Bearer ${accessToken}` as string,
                refresh_token: refreshToken as string,
            }
        });

        res.status(response.status).json(response.data);
    } catch (error: any) {
        res.status(error?.response?.status).json(error.response.data);
    }
}