import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const url = process.env.API_URL;

    try {
        const response = await axios.post(`${url}/users/sendVerificationForgotPasswordOtp`, req.body);

        res.status(response.status).json(response.data);
    } catch (error: any) {
        console.log('error', error)
        res.status(error?.response?.status).json({ error: 'Internal Server Error' });
    }
}