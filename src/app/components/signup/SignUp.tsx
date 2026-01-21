"use client";
import { Button } from "@components/basic/Button";
import {
  ApiError,
  beginSignup,
  configureApi,
} from "@tietokilta/ilmomasiina-client";
import { useRouter } from "next/navigation";
import { Quota } from "@tietokilta/ilmomasiina-models";
import React, { useState } from "react";
import { ILMOMASIINA_API_BASE_URL } from "@util/constants";
import { useTranslations } from "next-intl";

export const SignUp = ({
  quota,
  disabled,
}: {
  quota: Quota;
  disabled: boolean;
}) => {
  const t = useTranslations("ilmomasiina");
  const t_e = useTranslations("errors.ilmo.code");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const router = useRouter();
  configureApi(ILMOMASIINA_API_BASE_URL);

  const signUpAction = async () => {
    setLoading(true);
    try {
      setError(null);
      const result = await beginSignup(quota.id);
      router.push(`/signups/${result.id}/${result.editToken}`);
    } catch (error) {
      if (error instanceof ApiError) {
        setError(error);
      }
      console.log("Error signing up:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        text={`${t("signup")}: ${quota.title} ${quota.price > 0 ? `(${quota.price / 100} €)` : ""}`}
        disabled={disabled || loading}
        type="button"
        onClick={signUpAction}
      />
      {error?.code && <p className="text-juvu-red-dark">{t_e(error.code)}</p>}
    </div>
  );
};
