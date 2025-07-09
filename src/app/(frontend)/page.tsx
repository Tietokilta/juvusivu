import { getPayload } from "payload";
import configPromise from "@payload-config";
import { EventBox } from "@components/Event";

export default async function Home() {
  const payload = await getPayload({ config: configPromise });
  const events = await payload.find({
    collection: "events",
  });
  return (
    <main className="container mx-auto px-4 py-8">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus
        laborum nihil eaque commodi repudiandae animi ipsum aliquid quaerat
        tempore eius atque, in, fugiat iste earum explicabo nam eos officia
        nostrum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
        fuga repellat voluptatem sint. Eligendi sequi repellat laborum error
        sint nisi deserunt! Sunt quisquam rerum deserunt, magnam repudiandae
        corporis ipsa tenetur.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt
        eveniet aspernatur voluptas animi a fugiat commodi eligendi quos eum
        adipisci ab culpa explicabo, doloremque libero, delectus sint laborum
        voluptatem rerum?
      </p>
      <h2 className="mt-8 text-2xl font-bold">Juhlavuoden tapahtumat</h2>
      {events.docs.map((event) => (
        <EventBox key={event.id} event={event} />
      ))}
      <h2 className="mt-8 text-2xl font-bold">Historian havinaa</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores,
        inventore. Dolores blanditiis quo quae enim perferendis? Maiores optio
        itaque nemo ut cum culpa reprehenderit quis. Ullam impedit iste ut
        nobis.
      </p>
      <h2 className="mt-8 text-2xl font-bold">40. vuosijuhla</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi iste,
        esse, veritatis expedita deserunt neque sunt, vero enim quaerat adipisci
        cumque fuga dicta labore reprehenderit? Magni ut sint dolore ipsam.
      </p>
    </main>
  );
}
