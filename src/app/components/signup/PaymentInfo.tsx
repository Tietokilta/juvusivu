"use client";
import { ProductSchema } from "@tietokilta/ilmomasiina-models";
import { Window } from "@components/Window";
import { useI18n } from "@locales/client";

export const PaymentInfo = ({
  price,
  products,
}: {
  price: number | null;
  products: ProductSchema[] | null;
}) => {
  const t = useI18n();

  if (!price || price === 0 || !products || products.length === 0) {
    return null;
  }

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
      <p className="font-pixel mt-4 text-base">{t("payment-info-message")}</p>
    </Window>
  );
};
