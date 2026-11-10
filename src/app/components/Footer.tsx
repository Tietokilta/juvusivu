import { getPayload } from "payload";
import configPromise from "@payload-config";
import { getTranslations } from "next-intl/server";
import Sponsor from "./Sponsor";

export default async function Footer() {
  const payload = await getPayload({ config: configPromise });
  const sponsors = await payload.find({ collection: "sponsors" });
  if (sponsors.totalDocs === 0) return null;
  const t = await getTranslations();
  return (
    <footer className="bg-cream-dark text-ink relative flex flex-col items-center justify-center py-12">
      <p className="text-center font-mono text-lg font-bold">
        {t("sponsors-title")}
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-6">
        {sponsors.docs.map((sponsor) => (
          <Sponsor key={sponsor.id} sponsor={sponsor} />
        ))}
      </div>
    </footer>
  );
}
