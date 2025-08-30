import { NextRequest, NextResponse } from "next/server";
import { AppRoutes, Roles } from "./types/types";
import { ACCESS_CONTROL, APP_ROUTES } from "./constants";
import { getUserServerSession } from "./utils/server";

export default async function middleware(request: NextRequest) {
  try {
    const userSession = await getUserServerSession();

    const { pathname } = request.nextUrl;
    const isLoggedIn = !!(userSession?.session && userSession?.user);

    if (pathname === APP_ROUTES.LOGIN && isLoggedIn) {
      return NextResponse.redirect(new URL(APP_ROUTES.HOME, request.url));
    }

    if (!isLoggedIn && pathname === APP_ROUTES.HOME) {
      return NextResponse.redirect(new URL(APP_ROUTES.LOGIN, request.url));
    }

    if (isLoggedIn && userSession?.user.role) {
      const role = userSession.user.role as Roles;
      if (!ACCESS_CONTROL[role].includes(pathname)) {
        return NextResponse.redirect(
          new URL(APP_ROUTES.FORBIDDEN, request.url),
        );
      }
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL(APP_ROUTES.LOGIN, request.url));
  }
}

export const config = {
  matcher: ["/home", "/login"] satisfies AppRoutes[],
  runtime: "nodejs",
};
