import { useTranslations } from "next-intl";
import { useCallback } from "react";

export const isCloudStorageEnabled = (): boolean => {
  return (
    typeof process.env.AZURE_STORAGE_CONNECTION_STRING === "string" &&
    typeof process.env.AZURE_STORAGE_CONTAINER_NAME === "string" &&
    typeof process.env.AZURE_STORAGE_ACCOUNT_BASEURL === "string"
  );
};

export const dateFormatter = (date: string, locale: "en" | "fi"): string => {
  const d = new Date(date);
  return d.toLocaleString(`${locale}-FI`, {
    timeZone: "Europe/Helsinki",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// From ilmomasiina duration formatting
export function useDurationFormatter() {
  const t = useTranslations("duration");
  return useCallback(
    (ms: number) => {
      const sec = ms / 1000;
      if (sec < 120) return `${Math.floor(sec)} ${t("secs")}`;
      if (sec < 3600 + 60 - 1) return `${Math.floor(sec / 60)} ${t("mins")}`;
      if (sec < 86400 + 3600 - 1)
        return `${Math.floor(sec / 3600)} ${t("hours")}`;
      return `${Math.floor(sec / 86400)} ${t("days")}`;
    },
    [t],
  );
}
