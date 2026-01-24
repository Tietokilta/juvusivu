import { getPayload } from "payload";
import configPromise from "@payload-config";
import { getLocale } from "next-intl/server";
import { LexicalSerializer } from "@components/lexical/LexicalSerializer";

export default async function InfoscreenPage() {
  const payload = await getPayload({ config: configPromise });
  const locale = await getLocale();
  const content = await payload.findGlobal({
    slug: "infoscreen",
    locale,
  });

  return (
    <div className="h-full min-h-screen w-full p-8">
      <LexicalSerializer data={content.body} />
    </div>
  );
}
