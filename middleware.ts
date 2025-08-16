import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth/better-auth";
import { headers } from "next/headers";
import { Roles } from "./types/types";
import { ACCESS_CONTROL, APP_ROUTES } from "./static/constants/constants";

export default async function middleware(request: NextRequest) {
  const userSession = await auth.api.getSession({
    headers: await headers(),
  });

  //? Check if user is authenticated
  if (!userSession?.session || !userSession.user) {
    return NextResponse.redirect(new URL(APP_ROUTES.LOGIN, request.url));
  }
  //? Check if user has correct permission
  if (userSession?.user.role) {
    const user = userSession.user.role as Roles;

    if (!ACCESS_CONTROL[user].includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL(APP_ROUTES.FORBIDDEN, request.url));
    }
  }

  //TODO Find a workaround for this
  //   if (
  //     request.nextUrl.pathname === APP_ROUTES.LANDING ||
  //     request.nextUrl.pathname === APP_ROUTES.LOGIN
  //   ) {
  //     return NextResponse.redirect(new URL(APP_ROUTES.HOME, request.url));
  //   }
  //   console.log("Request path", request.nextUrl.pathname);

  return NextResponse.next();
}

export const config = {
  matcher: ["/home"],
};
