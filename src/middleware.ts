import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const I18nMiddleware = createMiddleware(routing);

export function middleware(req: NextRequest) {
  // Redirect API calls for signups to ilmomasiina
  if (req.nextUrl.pathname.startsWith("/api/signups")) {
    const target = new URL(
      `${req.nextUrl.pathname}${req.nextUrl.search}`,
      "https://ilmo.tietokilta.fi",
    );
    return NextResponse.redirect(target);
  }

  // When we have separate domain for anniversary year,
  // we want muistinnollaus.fi to redirect there
  const primaryDomain = process.env.PRIMARY_DOMAIN;
  const hostname = req.headers.get("host")!;
  if (
    primaryDomain &&
    hostname !== primaryDomain &&
    (hostname === "muistinnollaus.fi" ||
      hostname === "www.muistinnollaus.fi" ||
      hostname === "localhost:3000")
  ) {
    // Only trigger for frontpage requests (this allows easier redirect urls)
    if (
      req.nextUrl.pathname === "/" ||
      req.nextUrl.pathname === "/fi" ||
      req.nextUrl.pathname === "/en"
    ) {
      return NextResponse.redirect(
        new URL(`https://${primaryDomain}/m0`, req.url),
      );
    }
  }
  return I18nMiddleware(req);
}
export const config = {
  matcher: [
    "/api/signups/:path*",
    "/((?!api|static|admin|.*\\..*|_next|favicon.ico|robots.txt).*)",
  ],
};
