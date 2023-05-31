// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// type Data = {
//   name: string
// }

// export default function handler(
  // req: NextApiRequest,
  // res: NextApiResponse<Data>
// ) {
//   res.status(200).json({ name: 'John Doe' })
// }

import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = process.env.API_URL;

  try {
    const response = await axios.post(`${url}/users/sendVerificationSignupOtp`, req.body);

    // Handle the response from your NestJS API
    res.status(response.status).json(response.data);
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: 'Internal Server Error' });
  }
}