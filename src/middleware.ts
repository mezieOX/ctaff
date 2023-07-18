import { NextRequest, NextResponse } from "next/server";
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from "next";
import jwt_decode from 'jwt-decode';
import { getRouteRegex } from "next/dist/shared/lib/router/utils/route-regex";

const tdshrd1 = getRouteRegex('/dashboard/teacher_finder/find_teacher/teacher/[id]')
const admn1 = getRouteRegex('/admin/view_teacher_applicants/[id]')
const admn2 = getRouteRegex('/admin/view_recruited_teachers/[id]')

export default async function middleware(req: NextRequest, res: NextApiResponse) {
    const rt = req.cookies.get("refreshToken")?.value
    const at = req.cookies.get("accessToken")?.value
    const { pathname: path } = req.nextUrl
    const url = process.env.API_URL;
    const isDashboardPages = path === '/dashboard/teacher' ||
        path === "/login" ||
        path === '/dashboard/teacher/password-reset' ||
        path === '/dashboard/teacher/profile' ||
        path === '/dashboard/teacher_finder' ||
        path === '/dashboard/teacher_finder/find_teacher' ||
        tdshrd1.re.test(path)

    const isAdminPages = path === '/admin' ||
        path === '/admin/analytics' ||
        path === '/admin/view_all_users' ||
        path === '/admin/login' ||
        path === '/admin/view_teacher_applicants' ||
        path === '/admin/view_recruited_teachers' ||
        admn1.re.test(path) ||
        admn2.re.test(path)

    if (rt && at) {
        let rtPload: any;
        let atPload: any
        try {
            rtPload = await jwt_decode(rt);
            atPload = await jwt_decode(at);
        } catch (err) {
            let response;
            if (isAdminPages && path !== "/admin/login") {
                response = NextResponse.redirect(new URL('/admin/login', req.url), 302)
                response.cookies.delete("refreshToken")
                response.cookies.delete("accessToken")
                return response
            } else if (isDashboardPages && path !== "/login") {
                response = NextResponse.redirect(new URL('/login', req.url), 302)
                response.cookies.delete("refreshToken")
                response.cookies.delete("accessToken")
                return response
            } else if (path === "/login" || path === "/admin/login") {
                response = NextResponse.next()
                response.cookies.delete("refreshToken")
                response.cookies.delete("accessToken")
                return response
            }
        }

        if (rtPload && atPload) {
            const cTime = Math.floor(Date.now() / 1000);
            if (atPload.exp < cTime) {
                try {
                    const resp = await fetch(`${url}/auth/isValidCookieTokens`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${at}`,
                            'refresh_token': rt,
                        },
                    });
                    const data = await resp.json()

                    const nAt = resp?.headers?.get('authorization')?.replace("Bearer", "").trim() as string
                    const nRt = resp?.headers?.get('refresh_token') as string

                    if (resp.status === 401 || resp.status === 403) {
                        let response;
                        if (isAdminPages && path !== "/admin/login") {
                            response = NextResponse.redirect(new URL('/admin/login', req.url), 302)
                            response.cookies.delete("refreshToken")
                            response.cookies.delete("accessToken")
                            return response
                        } else if (isDashboardPages && path !== "/login") {
                            response = NextResponse.redirect(new URL('/login', req.url), 302)
                            response.cookies.delete("refreshToken")
                            response.cookies.delete("accessToken")
                            return response
                        } else if (path === "/login" || path === "/admin/login") {
                            response = NextResponse.next()
                            response.cookies.delete("refreshToken")
                            response.cookies.delete("accessToken")
                            return response
                        }
                    }

                    if (data.userRole === "admin" && (isDashboardPages || path === '/admin/login')) {
                        const res = NextResponse.redirect(new URL('/admin', req.url), 302)
                        res.cookies.set({
                            name: 'refreshToken',
                            value: nRt,
                            httpOnly: true,
                            path: '/',
                            sameSite: "strict",
                            secure: process.env.NODE_ENV !== "development",
                        })
                        res.cookies.set({
                            name: 'accessToken',
                            value: nAt,
                            httpOnly: true,
                            path: '/',
                            sameSite: "strict",
                            secure: process.env.NODE_ENV !== "development",
                        })

                        return res
                    } else if (data.userRole.includes('teacher') && (isAdminPages || path === '/login')) {
                        const res = NextResponse.redirect(new URL(`/dashboard/${data.userRole}`, req.url), 302)
                        res.cookies.set({
                            name: 'refreshToken',
                            value: nRt,
                            httpOnly: true,
                            path: '/',
                            sameSite: "strict",
                            secure: process.env.NODE_ENV !== "development",
                        })
                        res.cookies.set({
                            name: 'accessToken',
                            value: nAt,
                            httpOnly: true,
                            path: '/',
                            sameSite: "strict",
                            secure: process.env.NODE_ENV !== "development",
                        })

                        return res
                    } else {
                        // const res = NextResponse.next()
                        const res = NextResponse.redirect(new URL(path, req.url), 302)
                        res.cookies.set({
                            name: 'refreshToken',
                            value: nRt,
                            httpOnly: true,
                            path: '/',
                            sameSite: "strict",
                            secure: process.env.NODE_ENV !== "development",
                        })
                        res.cookies.set({
                            name: 'accessToken',
                            value: nAt,
                            httpOnly: true,
                            path: '/',
                            sameSite: "strict",
                            secure: process.env.NODE_ENV !== "development",
                        })

                        return res
                    }

                } catch (err) {
                    let response;
                    if (isAdminPages && path !== "/admin/login") {
                        response = NextResponse.redirect(new URL('/admin/login', req.url), 302)
                        response.cookies.delete("refreshToken")
                        response.cookies.delete("accessToken")
                        return response
                    } else if (isDashboardPages && path !== "/login") {
                        response = NextResponse.redirect(new URL('/login', req.url), 302)
                        response.cookies.delete("refreshToken")
                        response.cookies.delete("accessToken")
                        return response
                    } else if (path === "/login" || path === "/admin/login") {
                        response = NextResponse.next()
                        response.cookies.delete("refreshToken")
                        response.cookies.delete("accessToken")
                        return response
                    }
                }
            } else {
                if (atPload.role === 'admin' && isAdminPages && path !== '/admin/login') return NextResponse.next()
                else if ((atPload.role === 'teacher' || atPload.role === 'teacher_finder') && isDashboardPages && path !== '/login') return NextResponse.next()
                else if (atPload.role === 'admin' && (path === '/admin/login' || isDashboardPages)) return NextResponse.redirect(new URL('/admin', req.url), 302)
                else if ((atPload.role === 'teacher' || atPload.role === 'teacher_finder') && (path === '/login' || isAdminPages)) return NextResponse.redirect(new URL(`/dashboard/
                ${atPload.role}`, req.url), 302)
                else return NextResponse.next()
            }
        } else {
            if (isAdminPages && path !== "/admin/login") return NextResponse.redirect(new URL('/admin/login', req.url), 302)
            else if (isDashboardPages && path !== "/login") return NextResponse.redirect(new URL('/login', req.url), 302)
            else return NextResponse.next()
        }
    } else {
        if (isAdminPages && path !== "/admin/login") return NextResponse.redirect(new URL('/admin/login', req.url), 302)
        else if (isDashboardPages && path !== "/login") return NextResponse.redirect(new URL('/login', req.url), 302)
        else return NextResponse.next()
    }
}

export const config = {
    matcher: ["/login", "/admin/:path*", "/dashboard/:path*"],
    // matcher: ['/((?!api|_next/static|_next/image|favicon.ico|favicon|android|apple|mstile).*)',],
    // matcher: ['/admin/:path*',],
};

