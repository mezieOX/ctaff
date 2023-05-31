import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const url = process.env.API_URL;

    console.log('req.body', req.body)
    try {
        const response = await axios.post(`${url}/users/addTeacherDetails`, req.body);

        res.status(response.status).json(response.data);
    } catch (error: any) {
        res.status(error?.response?.status).json({ error: 'Internal Server Error' });
    }
}