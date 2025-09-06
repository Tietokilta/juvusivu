import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const locales = ["fi", "en"] as const;
const defaultLocale = "fi";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // skip static and api
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  )
    return;

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (!hasLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/((?!api|static|admin|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
