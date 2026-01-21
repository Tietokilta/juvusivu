"use client";
import { SignupFieldError } from "@tietokilta/ilmomasiina-models";
import { useTranslations } from "next-intl";

export const FieldErrorText = ({ error }: { error?: SignupFieldError }) => {
  const t = useTranslations("errors.ilmo.fieldError");
  if (!error) {
    return null;
  }
  return <div className="text-juvu-red-dark">{t(error)}</div>;
};
