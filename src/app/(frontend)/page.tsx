import { getPayload } from "payload";
import configPromise from "@payload-config";
import { LexicalSerializer } from "@components/LexicalSerializer";

export default async function Home() {
  const payload = await getPayload({ config: configPromise });
  const content = await payload.findGlobal({
    slug: "mainPage",
  });
  return (
    <main className="container mx-auto px-4 py-8">
      <LexicalSerializer data={content.body} />
    </main>
  );
}
