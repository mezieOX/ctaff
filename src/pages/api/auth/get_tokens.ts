// import cookie from "cookie";
import cookie from "cookie"
import { NextApiRequest, NextApiResponse } from "next";

const GetTokensFromCookies = (req: NextApiRequest, res: NextApiResponse) => {
    const { cookies } = req
    const {refreshToken, accessToken} = cookies
    console.log(cookies)
    res.status(200).json({ refreshToken, accessToken });
};

export default GetTokensFromCookies