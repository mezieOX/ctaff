// import cookie from "cookie";
import cookie from "cookie"
import { NextApiRequest, NextApiResponse } from "next";

const SetTokensAsCookies = (req: NextApiRequest, res: NextApiResponse) => {
    const { accessToken, refreshToken } = req.body;

    const rt = cookie.serialize(
        'refreshToken',
        refreshToken,
        {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            // maxAge: expiresIn,
            sameSite: "strict",
            path: "/",
        }
    )

    const at = cookie.serialize(
        'accessToken',
        accessToken,
        {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            // maxAge: expiresIn,
            sameSite: "strict",
            path: "/",
        }
    )

    res.setHeader(
        "Set-Cookie",
        [rt, at]
    );
    res.status(200).json({ success: true });
};

export default SetTokensAsCookies