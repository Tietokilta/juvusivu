"use client";

import { useChangeLocale } from "@i18n/routing";
import { useLocale } from "next-intl";

export const LanguageButton = () => {
  const locale = useLocale();
  const changeLocale = useChangeLocale();
  return (
    <button
      onClick={() => changeLocale(locale === "fi" ? "en" : "fi")}
      key="locale-toggle"
      className="flex-1 text-center font-bold hover:cursor-pointer hover:underline"
    >
      {locale === "fi" ? "In English" : "Suomeksi"}
    </button>
  );
};
