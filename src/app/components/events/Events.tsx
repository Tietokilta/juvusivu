import { getPayload } from "payload";
import configPromise from "@payload-config";
import { EventBox } from "./EventBox";
import { Locale } from "next-intl";

export default async function Events({
  locale,
  category,
}: {
  locale: Locale;
  category?: string;
}) {
  const payload = await getPayload({ config: configPromise });
  const events = await payload.find({
    collection: "events",
    ...(category && { where: { category: { equals: category } } }),
    locale,
    sort: "date", // Orders by date descending (newest first)
    pagination: false,
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
