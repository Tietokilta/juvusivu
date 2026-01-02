import { Window } from "@components/Window";
import { getCurrentLocale, getScopedI18n } from "@locales/server";
import { UserEventResponse } from "@tietokilta/ilmomasiina-models";
import { dateFormatter } from "@util/index";

export default async function EventSummary({
  event,
}: {
  event: UserEventResponse;
}) {
  const t = await getScopedI18n("ilmomasiina");
  const locale = await getCurrentLocale();

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
          {dateFormatter(event.date, locale)}
        </p>
      )}
      {event.endDate && (
        <p>
          <span className="font-bold">{t("headers.Loppuu")}:</span>{" "}
          {dateFormatter(event.endDate, locale)}
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
