import { createI18nServer } from "next-international/server";
import fi from "./fi";

export const locales = ["fi", "en"] as const;
export const defaultLocale = "fi";
export type Locale = (typeof locales)[number];
export type Dictionary = typeof fi;

export const { getI18n, getScopedI18n, getStaticParams, getCurrentLocale } =
  createI18nServer({
    en: () => import("./en"),
    fi: () => import("./fi"),
  });
