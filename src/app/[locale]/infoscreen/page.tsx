import Events from "@components/events/Events";
import { getCurrentLocale, getI18n } from "@locales/server";

export default async function InfoscreenPage() {
  const locale = await getCurrentLocale();
  const t = await getI18n();

  return (
    <div className="h-full min-h-screen w-full p-8">
      <h1 className="w-full pt-4 text-center font-mono text-4xl">
        {t("jubilee-events-title")}
      </h1>
      <Events locale={locale} />
    </div>
  );
}
