"use client";
import {
  PaymentMode,
  SignupPaymentStatus,
} from "@tietokilta/ilmomasiina-models";
import { Window } from "@components/Window";
import { useI18n, useScopedI18n } from "@locales/client";
import { Button } from "@components/basic/Button";
import {
  ApiError,
  useEditSignupContext,
  useStartPayment,
} from "@tietokilta/ilmomasiina-client";
import { useState } from "react";

const Payment = ({
  status,
  paymentError,
}: {
  status: SignupPaymentStatus | null | undefined;
  paymentError?: ApiError;
}) => {
  const t = useI18n();
  const t_e = useScopedI18n("errors.ilmo.code");
  if (paymentError) {
    return (
      <p className="text-juvu-red-dark">
        {t_e(paymentError.code ?? "DefaultPaymentError")}
      </p>
    );
  }
  switch (status) {
    case SignupPaymentStatus.PAID:
      return <p className="text-green-700">{t("payment.status.paid")}</p>;
    case SignupPaymentStatus.PENDING:
      return <p>{t("payment.status.pending")}</p>;
    case SignupPaymentStatus.REFUNDED:
      return <p>{t("payment.status.refunded")}</p>;
    default:
      return null;
  }
};

export const PaymentInfo = () => {
  const { signup, event, paymentError } = useEditSignupContext();
  const t = useI18n();
  const t_e = useScopedI18n("errors.ilmo.code");
  const paymentUrl = useStartPayment();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!signup) {
    return null;
  }

  const price = signup.price;
  const products = signup.products;

  if (!price || price === 0 || !products || products.length === 0) {
    return null;
  }

  const startPayment = async () => {
    try {
      setError(null);
      setProcessing(true);
      const url = await paymentUrl();
      window.location.href = url;
    } catch (e) {
      setProcessing(false);
      const error = e as ApiError;
      setError(t_e(error.code ?? "DefaultPaymentError"));
    }
  };

  return (
    <Window title={t("payment-info")} className="mx-auto my-7 max-w-3xl">
      <div className="shadow-solid border-accent-dark block w-full overflow-x-auto border-2">
        <table className="w-full table-auto border-separate border-spacing-0">
          <thead>
            <tr className="bg-row-even">
              <th className="font-pixel rounded-tl-md border-b border-gray-900 p-2 text-left text-lg">
                {t("product")}
              </th>
              <th className="font-pixel rounded-tl-md border-b border-gray-900 p-2 text-left text-lg">
                {t("price")}
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                className="odd:bg-row-odd even:bg-row-even"
                key={product.name}
              >
                <td className="font-pixel border-b border-gray-900 px-2 py-1 text-base">
                  <span>
                    {product.amount}x {product.name}
                  </span>
                </td>
                <td className="font-pixel border-b border-gray-900 px-2 py-1 text-base">
                  <span>{(product.amount * product.unitPrice) / 100} €</span>
                </td>
              </tr>
            ))}
            <tr className="bg-row-odd font-bold">
              <td className="font-pixel border-t border-gray-900 px-2 py-1 text-base">
                {t("total-price")}
              </td>
              <td className="font-pixel border-t border-gray-900 px-2 py-1 text-base">
                {price / 100} €
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="font-pixel mt-4 mb-2 text-lg">
        {event?.payments === PaymentMode.DISABLED && (
          <p>{t("payment-info-message")}</p>
        )}
        {event?.payments === PaymentMode.MANUAL && (
          <>
            <Payment
              status={signup.paymentStatus}
              paymentError={paymentError}
            />
            <p>{t("payment-info-message")}</p>
          </>
        )}
        {event?.payments === PaymentMode.ONLINE && (
          <Payment status={signup.paymentStatus} paymentError={paymentError} />
        )}
        {error && <p className="text-juvu-red-dark">{error}</p>}
      </div>
      {event?.payments === PaymentMode.ONLINE &&
        signup?.paymentStatus === SignupPaymentStatus.PENDING && (
          <Button
            onClick={startPayment}
            text={t("pay")}
            type="button"
            disabled={processing}
          />
        )}
    </Window>
  );
};
