"use client";
import { useDurationFormatter } from "@util/index";
import { useTranslations } from "next-intl";

export const SignupConfirmTime = ({
  confirmableUntil,
}: {
  confirmableUntil?: number;
}) => {
  const duration = useDurationFormatter();
  const t = useTranslations("ilmomasiina");
  if (confirmableUntil) {
    return (
      <p className="font-pixel text-lg">
        {t("confirm-time-left")}{" "}
        {duration(Math.max(0, confirmableUntil! - Date.now()))}.{" "}
        {t("confirm-save-or-lose")}
      </p>
    );
  }
};
