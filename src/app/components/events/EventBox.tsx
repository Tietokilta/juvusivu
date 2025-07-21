import { Event } from "../../../../payload-types";

export const EventBox = ({ event }: { event: Event }) => {
  return (
    <div className="event-box shadow-gray m-8 max-w-[400px] min-w-[250px] flex-1 shadow-lg">
      <div className="bg-accent-dark p-1">
        <h2 className="mx-2 font-mono font-extrabold text-white">
          {event.title}
        </h2>
      </div>
      <div className="bg-gray-200 p-4">
        <p>{event.description}</p>
        <p>XX.XX.XXXX at XX:XX</p>
        <button className="rounded border-2 border-gray-700 bg-gray-300 p-1">
          Open
        </button>
      </div>
    </div>
  );
};
