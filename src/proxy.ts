import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

export function proxy(req: NextRequest) {
  // Detect locale from cookie, but not from Accept-Language header
  const I18nMiddleware = createMiddleware({
    ...routing,
    localeDetection: req.cookies.has("NEXT_LOCALE"),
  });

  // Redirect API calls for signups to ilmomasiina
  if (req.nextUrl.pathname.startsWith("/api/signups")) {
    const target = new URL(
      `${req.nextUrl.pathname}${req.nextUrl.search}`,
      "https://ilmo.tietokilta.fi",
    );
    return NextResponse.redirect(target);
  }

  return I18nMiddleware(req);
}
export const config = {
  matcher: [
    "/api/signups/:path*",
    "/((?!api|static|admin|.*\\..*|_next|favicon.ico|robots.txt).*)",
  ],
};
