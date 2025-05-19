import { Event } from "../../../payload-types";

export const EventBox = ({ event }: { event: Event }) => {
  return (
    <div className="event-box m-8 border-4 border-solid border-gray-200 p-8">
      <h2>{event.title}</h2>
      <p>{event.description}</p>
    </div>
  );
};
