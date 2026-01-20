"use client";
import {
  SignupForEditResponse,
  SignupStatus,
} from "@tietokilta/ilmomasiina-models";
import { useTranslations } from "next-intl";

export const QuotaPositionText = ({
  signup,
  event,
}: {
  signup: SignupForEditResponse["signup"];
  event: SignupForEditResponse["event"];
}) => {
  const t = useTranslations("ilmomasiina.form");
  return (
    <p className="font-pixel text-lg">
      {signup.status === SignupStatus.IN_QUEUE
        ? `${t("You are in queue at position")} ${signup.position}.`
        : signup.status === SignupStatus.IN_OPEN_QUOTA
          ? `${t("You are in the open quota at position")} ${signup.position}/${event.openQuotaSize}.`
          : signup.status === SignupStatus.IN_QUOTA
            ? `${t("You are in the quota")} ${signup.quota.title} ${t("at position")} ${signup.position}${signup.quota.size ? `/${signup.quota.size}` : ""}.`
            : `${t("You are in the quota")} ${signup.quota.title} ${t("at position")} ${signup.position}.`}
    </p>
  );
};
