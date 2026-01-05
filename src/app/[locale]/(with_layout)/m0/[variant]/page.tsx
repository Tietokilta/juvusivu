export default async function Page({
  params,
}: {
  params: Promise<{ variant: string }>;
}) {
  const { variant } = await params;
  return <div>Variant page: {variant}</div>;
}
