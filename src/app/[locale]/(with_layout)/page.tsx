import { getPayload } from "payload";
import configPromise from "@payload-config";
import { LexicalSerializer } from "@components/lexical/LexicalSerializer";
import MainHeader from "@components/MainHeader";
import { getLocale } from "next-intl/server";

export default async function Home() {
  const payload = await getPayload({ config: configPromise });
  const locale = await getLocale();
  const content = await payload.findGlobal({
    slug: "mainPage",
    locale,
  });
  return (
    <>
      <MainHeader />
      <main className="container mx-auto max-w-5xl px-8 py-8">
        <LexicalSerializer data={content.body} />
      </main>
    </>
  );
}
