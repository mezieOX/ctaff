import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const url = process.env.API_URL;
    const { cookies } = req
    const { refreshToken, accessToken } = cookies

    const {teachId} = req.body

    try {
        const response = await axios.post(`${url}/users/orderTeacher/${teachId}`, {  }, {
            headers: {
                authorization: `Bearer ${accessToken}` as string,
                refresh_token: refreshToken as string,
            }
        });

        res.status(response.status).json(response.data);
        // res.status(200).json({success: true});
    } catch (error: any) {
        console.log('error.resonse', error.response.data)
        // res.status(error.response.data.message).json("something failed");
        res.status(error?.response?.status).json(error.response.data);
    }
}