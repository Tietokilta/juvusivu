import { getPayload } from "payload";
import configPromise from "@payload-config";
import Link from "next/link";

export default async function Footer() {
  const payload = await getPayload({ config: configPromise });
  const sponsors = await payload.find({ collection: "sponsors" });
  return (
    <footer className="bg-accent-light relative flex h-[300px] flex-col items-center justify-center py-24 text-black">
      <p className="text-center font-mono text-lg font-bold">
        Mukana sponsoroimassa
      </p>
      <div className="mt-6 flex gap-8">
        {sponsors.docs.map((sponsor) => (
          <Link key={sponsor.id} href={sponsor.url}>
            <div className="flex h-16 w-32 items-center justify-center rounded bg-white text-gray-400 shadow">
              {sponsor.name}
            </div>
          </Link>
        ))}
      </div>
    </footer>
  );
}
