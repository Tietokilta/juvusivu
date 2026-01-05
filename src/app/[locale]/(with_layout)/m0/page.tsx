import { BouncyLogo } from "@components/BouncyLogo";
import CountDown from "@components/CountDown";
import { Window } from "@components/Window";
import { fetchEvent } from "@lib/api/external/ilmomasiina";
import { getCurrentLocale, getI18n } from "@locales/server";
import Image from "next/image";
import { SignUpCountdown } from "@components/signup/SignUpCountdown";
import SignUpList from "@components/events/SignUpList";

export default async function M0page(slug?: string) {
  const locale = await getCurrentLocale();
  const t = await getI18n();
  const eventResponse = await fetchEvent(slug ?? "", locale);
  const event = eventResponse?.data;

  let text =
    "Tietokilta (TiK) system \n\
	(C)Copyright Tietokilta ry 1986-2026 \n\
\n\
T:\TIETOKILTA>format T: /s \n\
\n\
WARNING, ALL DATA ON NON-REMOVABLE DISK \n\
DRIVE T: WILL BE LOST! \n\
Proceed with Format (Y/N)? ";
  return (
    <>
      <div className="bg-juvu-blue-dark relative flex flex-col items-center justify-center gap-20 py-20">
        <Image
          src="m0_logo.svg"
          alt="Muistinnollaus 101000"
          width={1303}
          height={330}
        />
        <div className="font-pixel text-juvu-lightblue border-juvu-lightblue mx-auto max-w-125 border-2 border-dashed">
          <CountDown date={"2026-02-13T14:00:00"} locale={locale} />
        </div>
      </div>
      <main className="container mx-auto grid max-w-5xl grid-cols-2 gap-5 px-4 py-8">
        <div className="col-span-2 row-start-1 md:px-10">
          <Window title="Muistinnollaus">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo,
              delectus error nobis necessitatibus natus animi beatae corporis
              ut, qui cumque quod distinctio, repellat quia provident ipsa
              eligendi iure! Nemo magnam impedit molestias. Itaque saepe sint
              aspernatur nihil iusto, et cupiditate vero, quidem obcaecati
              praesentium nesciunt earum. Id suscipit quo iure fugit iste ex
              exercitationem adipisci nesciunt doloremque ratione at ipsum sint
              deserunt veritatis, facere inventore perspiciatis assumenda
              impedit illo commodi molestiae eveniet! Deleniti ab in nihil
              architecto sit incidunt corporis officia nesciunt commodi
              possimus! Beatae amet quae dolorem cum. Ipsam ea maxime labore
              eius facilis odit dicta error vitae recusandae?
            </p>
          </Window>
        </div>
        <div className="row-span-2 row-start-2">
          <Window hidePadding={true}>
            <div className="bg-accent-dark p-2">
              <p className="font-pixel text-juvu-white text-lg whitespace-pre-line">
                {text}
              </p>
            </div>
          </Window>
        </div>
        <div className="row-start-2">
          {event && (
            <Window title={t("ilmomasiina.Ilmoittautuminen")}>
              <SignUpCountdown event={event} />
            </Window>
          )}
        </div>
        <div className="col-start-2 row-start-3">
          <Window title="Muistinnollaus.gif">
            <BouncyLogo />
          </Window>
        </div>
        <div className="col-span-2 row-start-4 md:px-10">
          {event && (
            <Window title={t("ilmomasiina.Ilmoittautuneet")}>
              <SignUpList event={event} />
            </Window>
          )}
        </div>
      </main>
    </>
  );
}
