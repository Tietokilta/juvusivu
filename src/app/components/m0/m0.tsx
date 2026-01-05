import { getPayload } from "payload";
import configPromise from "@payload-config";
import { hasText } from "@payloadcms/richtext-lexical/shared";
import { BouncyLogo } from "@components/BouncyLogo";
import CountDown from "@components/CountDown";
import { Window } from "@components/Window";
import { fetchEvent } from "@lib/api/external/ilmomasiina";
import { getCurrentLocale, getI18n } from "@locales/server";
import Image from "next/image";
import { SignUpCountdown } from "@components/signup/SignUpCountdown";
import SignUpList from "@components/events/SignUpList";
import { LexicalSerializer } from "@components/lexical/LexicalSerializer";
import Header from "@components/Header";

export default async function M0content({ slug }: { slug?: string }) {
  const payload = await getPayload({ config: configPromise });
  const locale = await getCurrentLocale();
  const t = await getI18n();

  const config = await payload.findGlobal({
    slug: "m0config",
    locale,
  });

  const defaultDate = "2026-02-13T14:00:00";

  if (config.hideContents) {
    return (
      <>
        <Header text="Muistinnollaus 101000" />
        <main className="container mx-auto max-w-5xl px-4 py-8">
          <Window className="mx-auto max-w-[500px]">
            <div className="bg-juvu-white font-pixel">
              <CountDown
                date={config.eventDate ?? defaultDate}
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

  const text =
    "Tietokilta (TiK) system \n\
(C)Copyright Tietokilta ry 1986-2026 \n\
\n\
T:\TIETOKILTA>format MUISTI: /s \n\
\n\
WARNING, ALL DATA ON NON-REMOVABLE DISK \n\
DRIVE MUISTI: WILL BE LOST! \n\
Proceed with Format (Y/N)? y";
  return (
    <>
      <div className="bg-juvu-blue-dark relative flex flex-col items-center justify-center gap-20 px-4 pt-2 pb-20">
        <p className="text-juvu-lightblue-dark self-start pl-2 font-mono text-sm whitespace-pre-line">
          {text}
        </p>
        <Image
          src="/m0_logo.svg"
          alt="Muistinnollaus 101000"
          width={1303}
          height={330}
          className="md:px-4"
        />
        <div className="font-pixel text-juvu-lightblue border-juvu-lightblue mx-auto max-w-125 border-2 border-dashed">
          <CountDown date={config.eventDate ?? defaultDate} locale={locale} />
        </div>
      </div>
      <main className="container mx-auto grid max-w-5xl gap-5 px-4 py-8 md:grid-cols-2">
        {config.description && hasText(config.description) && (
          <div className="md:col-span-2 md:row-start-1 md:px-10">
            <Window title="Muistinnollaus">
              <LexicalSerializer data={config.description} />
            </Window>
          </div>
        )}
        <div className="md:row-start-2">
          <Window title="Muistinnollaus.gif">
            <BouncyLogo />
          </Window>
        </div>
        {event && (
          <>
            <div className="md:col-start-2 md:row-start-2">
              <Window title={t("ilmomasiina.Ilmoittautuminen")}>
                <SignUpCountdown event={event} />
              </Window>
            </div>
            <div className="md:col-span-2 md:row-start-4 md:px-10">
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
