import { getPayload } from "payload";
import configPromise from "@payload-config";
import { LexicalSerializer } from "@components/lexical/LexicalSerializer";
import { getCurrentLocale } from "@locales/server";
import Header from "@components/Header";
import { Window } from "@components/Window";

interface NextPage<Params extends Record<string, unknown>> {
  params: Promise<Params>;
}

type Props = NextPage<{ path: string[] }>;

export default async function Page(props: Props) {
  const params = await props.params;
  const { path } = params;
  const payload = await getPayload({ config: configPromise });
  const locale = await getCurrentLocale();
  const slug = Array.isArray(params?.path)
    ? params!.path.join("/")
    : (params?.path ?? "");

  const { docs } = await payload.find({
    collection: "pages",
    locale,
    where: { slug: { equals: slug || "/" } },
  });
  const page = docs[0];
  if (!page) {
    return (
      <>
        <Header
          text="Tietokilta 404 - Page Not Found"
          animated
          size="small"
          className="min-w-full py-10"
        />
        <main className="container mx-auto max-w-5xl px-8 py-8 sm:max-w-[90dvw]">
          <h1>Sivua ei löytynyt</h1>
          <p>Yritit hakea sivua: {path}</p>
        </main>
      </>
    );
  }
  return (
    <>
      <Header
        text={page.title.replaceAll("&shy;", "\u00AD")}
        animated
        size="medium"
        className="sticky top-0 z-50 break-words hyphens-auto backdrop-blur-2xl"
      />
      <main className="container mx-auto max-w-[90dvh] px-8 py-4 sm:max-w-4xl">
        {page.body &&
          page.body.map(
            (block, idx) =>
              block && (
                <Window
                  title={block.title ?? ""}
                  windowPath={block.path ?? undefined}
                  key={idx}
                  className="my-4"
                >
                  <LexicalSerializer data={block.content} />
                </Window>
              ),
          )}
      </main>
    </>
  );
}
