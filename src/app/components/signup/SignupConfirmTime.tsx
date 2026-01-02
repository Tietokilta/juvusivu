"use client";
import { useScopedI18n } from "@locales/client";
import { useDurationFormatter } from "@util/index";

export const SignupConfirmTime = ({
  confirmableUntil,
}: {
  confirmableUntil?: number;
}) => {
  const duration = useDurationFormatter();
  const t = useScopedI18n("ilmomasiina");
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
