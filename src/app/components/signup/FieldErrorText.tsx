"use client";
import { useScopedI18n } from "@locales/client";
import { SignupFieldError } from "@tietokilta/ilmomasiina-models";

export const FieldErrorText = ({ error }: { error?: SignupFieldError }) => {
  if (!error) {
    return null;
  }
  const t = useScopedI18n("errors.ilmo.fieldError");
  return <div className="text-red-600">{t(error)}</div>;
};
