import { Event } from "../../../../payload-types";
import { Window } from "@components/Window";

export const EventBox = async ({ event }: { event: Event }) => {
  const url = event.slug
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
          <p>{event.description}</p>
          <p>XX.XX.XXXX at XX:XX</p>
        </div>
      </Window>
    </div>
  );
};
