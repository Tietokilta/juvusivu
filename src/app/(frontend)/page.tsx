import { getPayload } from "payload";
import configPromise from "@payload-config";
import { EventBox } from "@components/Event";
import { Redaction } from "@components/Redaction";
import CountDown from "@components/CountDown";

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
      <div className="mt-20">
        <Redaction text="Muistinnollaus 101000" size="small" />
        <div className="flex w-full justify-center">
          <CountDown date={"2026-02-13T14:00:00"} />
        </div>
      </div>
    </>
  );
}
