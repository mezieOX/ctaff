import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

// export const config = {
//     api: {
//         responseLimit: false,
//     },
// }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const url = process.env.API_URL;
    const { cookies } = req
    const { refreshToken, accessToken } = cookies

    try {
        const response = await axios.patch(`${url}/users/updateTeacherDetails`, req.body, {
            headers: {
                authorization: `Bearer ${accessToken}` as string,
                refresh_token: refreshToken as string,
            }
        });

        console.log('pic', response)
        res.status(response.status).json(response.data);
    } catch (error: any) {
        console.log("err", error)
        res.status(error?.response?.status).json(error?.response.data);
    }
}