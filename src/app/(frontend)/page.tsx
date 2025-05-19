import { getPayload } from "payload";
import configPromise from "@payload-config";
import { EventBox } from "../components/Event";
import { Redaction } from "../components/Redaction";

export default async function Home() {
  const payload = await getPayload({ config: configPromise });
  const events = await payload.find({
    collection: "events",
  });
  return (
    <>
      <Redaction text="Tietokilta 40" />
      {events.docs.map((event) => (
        <EventBox key={event.id} event={event} />
      ))}
    </>
  );
}
