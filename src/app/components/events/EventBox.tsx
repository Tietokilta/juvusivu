import { getI18n } from "@locales/server";
import { Event } from "../../../../payload-types";

export const EventBox = async ({ event }: { event: Event }) => {
  const t = await getI18n();
  return (
    <div className="event-box m-8 max-w-[400px] min-w-[250px] flex-1 shadow-lg shadow-gray-500">
      <div className="bg-accent-dark p-1">
        <h2 className="mx-2 font-mono font-extrabold text-white">
          {event.title}
        </h2>
      </div>
      <div className="bg-gray-200 p-4">
        <p>{event.description}</p>
        <p>XX.XX.XXXX at XX:XX</p>
        <button className="rounded border-2 border-gray-700 bg-gray-300 p-1">
          {t("open-button")}
        </button>
      </div>
    </div>
  );
};
