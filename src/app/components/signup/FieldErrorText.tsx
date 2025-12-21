"use client";
import { useScopedI18n } from "@locales/client";
import { SignupFieldError } from "@tietokilta/ilmomasiina-models";

export const FieldErrorText = ({ error }: { error?: SignupFieldError }) => {
  const t = useScopedI18n("errors.ilmo.fieldError");
  if (!error) {
    return null;
  }
  return <div className="text-juvu-red-dark">{t(error)}</div>;
};
