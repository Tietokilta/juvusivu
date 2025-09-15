import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest } from "next/server";

const I18nMiddleware = createI18nMiddleware({
  locales: ["fi", "en"],
  defaultLocale: "fi",
  urlMappingStrategy: "rewriteDefault",
  resolveLocaleFromRequest: () => "fi", // default to Finnish
});
export function middleware(req: NextRequest) {
  return I18nMiddleware(req);
}
export const config = {
  matcher: ["/((?!api|static|admin|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
