import { getPayload } from "payload";
import configPromise from "@payload-config";
import { hasText } from "@payloadcms/richtext-lexical/shared";
import { BouncyLogo } from "@components/BouncyLogo";
import CountDown from "@components/CountDown";
import { Window } from "@components/Window";
import { fetchEvent } from "@lib/api/external/ilmomasiina";
import { getLocale, getTranslations } from "next-intl/server";
import { SignUpCountdown } from "@components/signup/SignUpCountdown";
import SignUpList from "@components/events/SignUpList";
import { LexicalSerializer } from "@components/lexical/LexicalSerializer";
import Header from "@components/Header";
import { EventDescription } from "@components/events/EventDescription";
import QuotaWindow from "@components/events/QuotaWindow";
import { MAIN_EVENT_DATE } from "@util/constants";

export default async function M0content({ slug }: { slug?: string }) {
  const payload = await getPayload({ config: configPromise });
  const locale = await getLocale();
  const t = await getTranslations();

  const config = await payload.findGlobal({
    slug: "m0config",
    locale,
  });

  if (config.hideContents) {
    return (
      <>
        <Header text="Muistinnollaus 101001" />
        <main className="container mx-auto max-w-5xl px-4 py-8">
          <Window className="mx-auto max-w-[500px]">
            <div className="bg-cream-light font-mono">
              <CountDown
                date={config.eventDate ?? MAIN_EVENT_DATE}
                locale={locale}
              />
            </div>
          </Window>
        </main>
      </>
    );
  }

  const eventResponse = await fetchEvent(
    slug ?? config.defaultVariant ?? "",
    locale,
  );
  const event = eventResponse?.data;
  const hasSignup = event && event.quotas.length > 0;

  const text =
    "Tietokilta (TiK) system \n\
(C)Copyright Tietokilta ry 1986-2027 \n\
\n\
T:\\TIETOKILTA>format MUISTI: /s \n\
\n\
WARNING, ALL DATA ON NON-REMOVABLE DISK \n\
DRIVE MUISTI: WILL BE LOST! \n\
Proceed with Format (Y/N)? y";
  return (
    <>
      <div className="bg-vine text-ink relative flex flex-col items-center justify-center gap-8 px-4 pt-2 pb-20 md:h-[95dvh] md:max-h-[900px] md:min-h-[650px]">
        <p className="self-start pl-2 font-mono text-sm whitespace-pre-line">
          {text}
        </p>
        <h1 className="flex flex-1 items-center text-center font-mono text-[clamp(2rem,8vw,5rem)] font-bold">
          Muistinnollaus 101001
        </h1>
        <div className="bg-cream-light border-ink mx-auto max-w-125 border-2 border-dashed font-mono">
          <CountDown
            date={config.eventDate ?? MAIN_EVENT_DATE}
            locale={locale}
          />
        </div>
      </div>
      <main className="container mx-auto grid max-w-5xl gap-5 px-4 py-8">
        {config.description && hasText(config.description) && (
          <div className="md:col-span-2 md:row-start-1 md:px-10">
            <Window title="Muistinnollaus">
              <LexicalSerializer data={config.description} />
            </Window>
          </div>
        )}
        {event?.description && config.showDescriptionFromIlmo && (
          <div className="md:col-span-2 md:row-start-2 md:px-10">
            <EventDescription event={event} />
          </div>
        )}
        <div className="md:row-start-3">
          <Window title="Muistinnollaus.gif" className="mx-auto max-w-xl">
            <BouncyLogo />
          </Window>
        </div>
        {hasSignup && (
          <>
            <div className="md:col-start-2 md:row-start-3">
              <Window
                title={t("ilmomasiina.Ilmoittautuminen")}
                className="mb-5"
              >
                <SignUpCountdown event={event} />
              </Window>
              {config.showQuotaInfo && <QuotaWindow event={event} />}
            </div>
            <div className="overflow-x-auto md:col-span-2 md:row-start-4 md:px-10">
              <Window title={t("ilmomasiina.Ilmoittautuneet")}>
                <SignUpList event={event} />
              </Window>
            </div>
          </>
        )}
      </main>
    </>
  );
}
