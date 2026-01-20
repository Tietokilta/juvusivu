import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["fi", "en"],

  // Used when no locale matches
  defaultLocale: "fi",

  localePrefix: "as-needed",
});
