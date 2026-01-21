import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["fi", "en"],

  // Used when no locale matches
  defaultLocale: "fi",

  localePrefix: "as-needed",
  localeCookie: {
    maxAge: 60 * 60 * 24 * 365, // 1 year
  },
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

export const useChangeLocale = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (locale: "fi" | "en") => {
    router.replace(pathname, { locale });
  };
};
