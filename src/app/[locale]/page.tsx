import { getPayload } from "payload";
import configPromise from "@payload-config";
import { LexicalSerializer } from "@components/lexical/LexicalSerializer";
import { getCurrentLocale } from "../../../locales/server";
import Header from "@components/Header";

export default async function Home() {
  const payload = await getPayload({ config: configPromise });
  const locale = await getCurrentLocale();
  const content = await payload.findGlobal({
    slug: "mainPage",
    locale,
  });
  return (
    <>
      <Header text="Tietokilta 40" animated />
      <main className="container mx-auto max-w-5xl px-8 py-8">
        <LexicalSerializer data={content.body} />
      </main>
    </>
  );
}
