import { Window } from "@components/Window";
import { IlmomasiinaEvent } from "@lib/api/external/ilmomasiina";
import { getScopedI18n, getCurrentLocale } from "@locales/server";

function getLocalizedEventTitle(eventTitle: string, locale: "fi" | "en") {
  const titleLocaleSeparator = " // ";
  const [fiTitle, enTitle] = eventTitle.split(titleLocaleSeparator);
  if (locale === "en") {
    return enTitle || fiTitle;
  }

  return fiTitle;
}

export default async function EventSummary({
  event,
}: {
  event: IlmomasiinaEvent;
}) {
  const t = await getScopedI18n("ilmomasiina");
  const locale = await getCurrentLocale();

  return (
    <Window title={getLocalizedEventTitle(event.title, locale)}>
      {event.location && (
        <p>
          <span className="font-bold">{t("headers.Paikka")}:</span>{" "}
          {event.location}
        </p>
      )}
      {event.date && (
        <p>
          <span className="font-bold">{t("headers.Alkaa")}:</span>{" "}
          {new Date(event.date).toLocaleString("fi-FI", {
            timeZone: "Europe/Helsinki",
          })}
        </p>
      )}
      {event.endDate && (
        <p>
          <span className="font-bold">{t("headers.Loppuu")}:</span>{" "}
          {new Date(event.endDate).toLocaleString("fi-FI", {
            timeZone: "Europe/Helsinki",
          })}
        </p>
      )}
      {event.price && (
        <p>
          <span className="font-bold">{t("headers.Hinta")}:</span> {event.price}
        </p>
      )}
    </Window>
  );
}
