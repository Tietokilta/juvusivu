import { Button } from "@components/basic/Button";
import { Event } from "../../../../payload-types";
import { Window } from "@components/Window";
import { ProgressBar } from "@components/basic/ProgressBar";
import { getI18n } from "@locales/server";

export const EventBox = async ({ event }: { event: Event }) => {
  const t = await getI18n();
  const url =
    event.slug && event.released
      ? `https://tietokilta.fi/fi/tapahtumat/${event.slug}`
      : undefined;
  return (
    <div className="event-box m-8 max-w-[400px] min-w-[250px] shadow-lg shadow-gray-500">
      <Window link={url}>
        <div className="border-accent-dark bg-juvu-white mb-2 border-2 p-1">
          <h2 className="text-accent-dark font-pixel mx-2 text-lg">
            C:\..\Juhlavuosi\{event.title}
          </h2>
        </div>
        <div className="bg-juvu-white border-accent-dark font-pixel border-2 p-4 text-lg">
          {event.released ? (
            <>
              <p>{event.description}</p>
              <p>XX.XX.XXXX at XX:XX</p>
            </>
          ) : (
            <>
              <p className="text-center">{t("loading")}</p>
              <div className="mx-auto mt-2 flex w-3/4">
                <ProgressBar max={16} value={9} />
              </div>
              <div className="mt-5 flex justify-evenly gap-2">
                <Button text={t("ready")} disabled />
                <Button text={t("cancel")} />
              </div>
            </>
          )}
        </div>
      </Window>
    </div>
  );
};
