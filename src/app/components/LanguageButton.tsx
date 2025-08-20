"use client";

import { useChangeLocale, useCurrentLocale } from "@locales/client";

export const LanguageButton = () => {
  const locale = useCurrentLocale();
  const changeLocale = useChangeLocale();
  return (
    <button
      onClick={() => changeLocale(locale === "fi" ? "en" : "fi")}
      key="locale-toggle"
      className="text-header flex-1 text-center font-bold hover:cursor-pointer hover:underline"
    >
      {locale === "fi" ? "In English" : "Suomeksi"}
    </button>
  );
};
