import Events from "@components/events/Events";
import { getCurrentLocale, getScopedI18n } from "@locales/server";

export default async function InfoscreenPage() {
  const locale = await getCurrentLocale();
  const t = await getScopedI18n("ilmomasiina");

  return (
    <div className="h-full w-full">
      <h1 className="font-pixel w-full pt-4 text-center text-4xl font-extrabold">
        {t("all-events.Kaikki tapahtumat")}
      </h1>
      <Events locale={locale} />
    </div>
  );
}
