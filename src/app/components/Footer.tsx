import { getPayload } from "payload";
import configPromise from "@payload-config";
import { getI18n } from "@locales/server";
import Sponsor from "./Sponsor";

export default async function Footer() {
  const payload = await getPayload({ config: configPromise });
  const sponsors = await payload.find({ collection: "sponsors" });
  const t = await getI18n();
  return (
    <footer className="bg-accent-light relative flex h-[300px] flex-col items-center justify-center py-24 text-black">
      {sponsors.totalDocs > 0 && (
        <>
          <p className="text-center font-mono text-lg font-bold">
            {t("sponsors-title")}
          </p>
          <div className="mt-6 flex gap-8">
            {sponsors.docs.map((sponsor) => (
              <Sponsor key={sponsor.id} sponsor={sponsor} />
            ))}
          </div>
        </>
      )}
    </footer>
  );
}
