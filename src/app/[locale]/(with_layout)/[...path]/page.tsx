import { getPayload } from "payload";
import configPromise from "@payload-config";
import { LexicalSerializer } from "@components/lexical/LexicalSerializer";
import { getLocale } from "next-intl/server";
import Header from "@components/Header";
import { Window } from "@components/Window";
import { notFound, redirect } from "next/navigation";

interface NextPage<Params extends Record<string, unknown>> {
  params: Promise<Params>;
}

type Props = NextPage<{ path: string[] }>;

export default async function Page(props: Props) {
  const params = await props.params;
  const payload = await getPayload({ config: configPromise });
  const locale = await getLocale();
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
    // Check if there is a redirect for this url
    const m0config = await payload.findGlobal({
      slug: "m0config",
      locale,
    });
    const redirectPath = m0config.variants?.find((v) => v.label === slug);
    if (redirectPath) {
      return redirect(`/m0/${redirectPath.label}`);
    }
    notFound();
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
              block &&
              block.content && (
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
