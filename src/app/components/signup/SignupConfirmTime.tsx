"use client";
import { useEffect, useState } from "react";
import { useDurationFormatter } from "@util/index";
import { useTranslations } from "next-intl";

export const SignupConfirmTime = ({
  confirmableUntil,
}: {
  confirmableUntil?: number;
}) => {
  const duration = useDurationFormatter();
  const t = useTranslations("ilmomasiina");
  const [timeLeft, setTimeLeft] = useState(() =>
    confirmableUntil ? Math.max(0, confirmableUntil - Date.now()) : 0,
  );

  useEffect(() => {
    if (!confirmableUntil) return;

    // Update every 10 seconds
    const interval = setInterval(() => {
      setTimeLeft(Math.max(0, confirmableUntil - Date.now()));
    }, 10000);

    return () => clearInterval(interval);
  }, [confirmableUntil]);

  if (confirmableUntil) {
    return (
      <p className="font-pixel text-lg">
        {t("confirm-time-left")} {duration(timeLeft)}.{" "}
        {t("confirm-save-or-lose")}
      </p>
    );
  }
};
