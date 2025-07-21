import { getPayload } from "payload";
import configPromise from "@payload-config";
import { EventBox } from "./EventBox";
import { Locale } from "@locales/server";

export default async function Events({ locale }: { locale: Locale }) {
  const payload = await getPayload({ config: configPromise });
  const events = await payload.find({
    collection: "events",
    locale,
  });

  return (
    <div className="flex shrink-0 flex-wrap justify-center">
      {events.docs.map((event) => (
        <EventBox key={event.id} event={event} />
      ))}
    </div>
  );
}
