import { Window } from "@components/Window";
import { getScopedI18n, getCurrentLocale } from "@locales/server";
import { UserEventResponse } from "@tietokilta/ilmomasiina-models";

export default async function EventSummary({
  event,
}: {
  event: UserEventResponse;
}) {
  const t = await getScopedI18n("ilmomasiina");

  return (
    <Window title={event.title}>
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
