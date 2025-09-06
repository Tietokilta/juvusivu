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
          className="py-10"
        />
        <main className="container mx-auto max-w-5xl px-8 py-8">
          <h1>Sivua ei löytynyt</h1>
          <p>Yritit hakea sivua: {path}</p>
        </main>
      </>
    );
  }
  return (
    <>
      <Header
        text={page.title}
        animated
        size="medium"
        className="sticky top-0 z-50 backdrop-blur-2xl"
      />
      v
      <main className="container mx-auto max-w-5xl px-8 py-4">
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
