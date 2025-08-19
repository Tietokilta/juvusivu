import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest } from "next/server";

const I18nMiddleware = createI18nMiddleware({
  locales: ["en", "fi"],
  defaultLocale: "fi",
  urlMappingStrategy: "rewriteDefault",
  resolveLocaleFromRequest: () => {
    // ignore Accept-Language header and use the default locale always
    return "fi";
  },
});

export function middleware(request: NextRequest) {
  return I18nMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|static|admin|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
