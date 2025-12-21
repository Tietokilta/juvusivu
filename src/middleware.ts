import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest, NextResponse } from "next/server";

const I18nMiddleware = createI18nMiddleware({
  locales: ["fi", "en"],
  defaultLocale: "fi",
  urlMappingStrategy: "rewriteDefault",
  resolveLocaleFromRequest: () => "fi", // default to Finnish
});
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
    return NextResponse.redirect(
      new URL(`https://${primaryDomain}/m0`, req.url),
    );
  }

  return I18nMiddleware(req);
}
export const config = {
  matcher: [
    "/api/signups/:path*",
    "/((?!api|static|admin|.*\\..*|_next|favicon.ico|robots.txt).*)",
  ],
};
