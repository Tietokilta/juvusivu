import { Button } from "@components/basic/Button";
import { Event, Media } from "../../../../payload-types";
import { Window } from "@components/Window";
import { ProgressBar } from "@components/basic/ProgressBar";
import { getI18n } from "@locales/server";
import Image from "next/image";

export const EventBox = async ({
  event,
  className,
}: {
  event: Event;
  className?: string;
}) => {
  const t = await getI18n();
  const url = event.slug && event.released ? `events/${event.slug}` : undefined;
  const date = event.date && event.released ? new Date(event.date) : undefined;
  const photo = event.photo as Media | undefined;
  return (
    <div className={`event-box max-w-[400px] min-w-[250px] ${className ?? ""}`}>
      <Window
        link={url}
        simple={false}
        title={date ? `${date.getDate()}.${date.getMonth() + 1}.` : undefined}
      >
        <div className="border-accent-dark bg-juvu-white mb-2 border-2 p-1">
          <h2 className="text-accent-dark font-pixel mx-2 text-lg">
            C:\..\Juhlavuosi\{event.title}
          </h2>
        </div>
        <div className="bg-juvu-white border-accent-dark font-pixel border-2 p-4 text-lg">
          {event.released ? (
            photo?.url ? (
              <>
                <Image
                  src={photo.url}
                  alt={event.title}
                  className="w-full"
                  width={400}
                  height={300}
                />
              </>
            ) : (
              <>
                <p>{event.description}</p>
              </>
            )
          ) : (
            <>
              <p className="text-center">{t("loading")}</p>
              <div className="mx-auto mt-2 flex w-3/4">
                <ProgressBar max={16} value={9} />
              </div>
              <div className="mt-5 flex justify-evenly gap-2">
                <Button text={t("ready")} disabled />
                <Button text={t("cancel")} fake />
              </div>
            </>
          )}
        </div>
      </Window>
    </div>
  );
};
