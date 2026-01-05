import M0content from "@components/m0/m0";
import { getCurrentLocale } from "@locales/server";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ variant: string }>;
}) {
  const { variant } = await params;
  const payload = await getPayload({ config: configPromise });
  const locale = await getCurrentLocale();

  const config = await payload.findGlobal({
    slug: "m0config",
    locale,
  });

  // Resolve the variant or display 404 error page
  const slug = config.variants?.find((v) => v.label === variant)?.ilmo;
  if (!slug) {
    return notFound();
  }
  return <M0content slug={slug} />;
}
