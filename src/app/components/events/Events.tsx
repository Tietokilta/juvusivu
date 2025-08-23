import { getPayload } from "payload";
import configPromise from "@payload-config";
import { EventBox } from "./EventBox";
import { Locale } from "@locales/server";

export default async function Events({ locale }: { locale: Locale }) {
  const payload = await getPayload({ config: configPromise });
  const events = await payload.find({
    collection: "events",
    locale,
    sort: "date", // Orders by date descending (newest first)
  });

  return (
    <div className="my-8 flex shrink-0 flex-wrap justify-center gap-8">
      {events.docs.map((event) => (
        <div className="flex-1" key={event.id}>
          <EventBox event={event} className="mx-auto" />
        </div>
      ))}
    </div>
  );
}
