"use client";
import { useScopedI18n } from "@locales/client";
import { Button } from "@components/basic/Button";
import { beginSignup, configureApi } from "@tietokilta/ilmomasiina-client";
import { useRouter } from "next/navigation";
import { Quota } from "@tietokilta/ilmomasiina-models";
import React, { useState } from "react";
import { ILMOMASIINA_API_BASE_URL } from "@util/constants";

export const SignUp = ({
  quota,
  disabled,
}: {
  quota: Quota;
  disabled: boolean;
}) => {
  const t = useScopedI18n("ilmomasiina");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  configureApi(ILMOMASIINA_API_BASE_URL);

  const signUpAction = async () => {
    setLoading(true);
    try {
      const result = await beginSignup(quota.id);
      router.push(`/signups/${result.id}/${result.editToken}`);
    } catch (error) {
      console.log("Error signing up:", error);
      setLoading(false);
    }
  };

  return (
    <Button
      text={`${t("signup")}: ${quota.title} ${quota.price > 0 ? `(${quota.price / 100} €)` : ""}`}
      disabled={disabled || loading}
      type="button"
      onClick={signUpAction}
    />
  );
};
