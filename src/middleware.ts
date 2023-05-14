import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest } from "next";

export default function middleware(req: NextRequest){
    // console.log(req.nextUrl)
    console.log("hello")
    // return NextResponse.next()
}

export const config = {
    matcher: ["/login", "/register/:path*"],
};