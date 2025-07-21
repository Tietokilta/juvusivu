import { getPayload } from "payload";
import configPromise from "@payload-config";
import { EventBox } from "./EventBox";

export default async function Events() {
  const payload = await getPayload({ config: configPromise });
  const events = await payload.find({
    collection: "events",
  });

  return (
    <div className="flex shrink-0 flex-wrap justify-center">
      {events.docs.map((event) => (
        <EventBox key={event.id} event={event} />
      ))}
    </div>
  );
}
