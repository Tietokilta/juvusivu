"use client";
import {
  SignupForEditResponse,
  SignupStatus,
} from "@tietokilta/ilmomasiina-models";
import { useTranslations } from "next-intl";

export const QuotaPositionText = ({
  signup,
}: {
  signup: SignupForEditResponse["signup"];
}) => {
  const t = useTranslations("ilmomasiina.position");
  return (
    <p className="font-pixel text-lg">
      {signup.status === SignupStatus.IN_QUEUE
        ? `${t("queue", { position: signup.position ?? "?" })}`
        : signup.status === SignupStatus.IN_OPEN_QUOTA
          ? `${t("openQuota", { position: signup.position ?? "?" })}`
          : signup.status === SignupStatus.IN_QUOTA
            ? `${t("quota", { quota: signup.quota.title, position: `${signup.position}${signup.quota.size ? `/${signup.quota.size}` : ""}` })}`
            : `${t("quota", { quota: signup.quota.title, position: signup.position ?? "?" })}`}
    </p>
  );
};
