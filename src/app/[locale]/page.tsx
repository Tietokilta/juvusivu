import { getPayload } from "payload";
import configPromise from "@payload-config";
import { LexicalSerializer } from "@components/LexicalSerializer";
import { getCurrentLocale } from "../../../locales/server";

export default async function Home() {
  const payload = await getPayload({ config: configPromise });
  const locale = await getCurrentLocale();
  const content = await payload.findGlobal({
    slug: "mainPage",
    locale,
  });
  return (
    <main className="container mx-auto px-4 py-8">
      <LexicalSerializer data={content.body} />
    </main>
  );
}
