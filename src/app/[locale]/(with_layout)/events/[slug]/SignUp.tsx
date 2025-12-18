"use client";
import { useScopedI18n } from "@locales/client";
import { Button } from "@components/basic/Button";
import { beginSignup } from "@tietokilta/ilmomasiina-client";
import { useRouter } from "next/navigation";
import { Quota } from "@tietokilta/ilmomasiina-models";

export const SignUp = ({
  quota,
  disabled,
}: {
  quota: Quota;
  disabled: boolean;
}) => {
  const t = useScopedI18n("ilmomasiina");
  const router = useRouter();

  const signUpAction = async () => {
    const result = await beginSignup(quota.id);
    router.push(`/signups/${result.id}/${result.editToken}`);
  };

  return (
    <Button
      text={`${t("signup")}: ${quota.title}`}
      disabled={disabled}
      type="button"
      onClick={signUpAction}
    />
  );
};
