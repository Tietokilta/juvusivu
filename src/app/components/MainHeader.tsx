import { getLocale, getTranslations } from "next-intl/server";
import CountDown from "./CountDown";
import { MAIN_EVENT_DATE } from "@util/constants";

export default async function MainHeader() {
  const t = await getTranslations();
  const locale = await getLocale();
  return (
    <div className="bg-vine text-ink flex min-h-full flex-col items-center justify-center gap-8 px-4 py-16 md:h-[95dvh] md:max-h-[900px] md:min-h-[max(600px,100%)]">
      <h1 className="text-center font-mono text-[clamp(2rem,8vw,5rem)] font-bold">
        Muistinnollaus 101001
      </h1>
      <div className="text-center font-mono text-2xl font-bold">
        <p>{t("main-event")} 5.3.2027</p>
        <p>{t("sillis")} 6.3.2027</p>
      </div>
      <div className="bg-cream-light border-ink border-2 font-mono">
        <CountDown date={MAIN_EVENT_DATE} locale={locale} />
      </div>
    </div>
  );
}
