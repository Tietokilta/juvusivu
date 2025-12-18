import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{
    path: string[];
  }>;
}

const ilmomasiinaBaseUrl = "https://ilmo.tietokilta.fi/api/signups/";

export default async function Page(props: PageProps) {
  const params = await props.params;

  const { path } = params;

  const url = new URL(path.join("/"), ilmomasiinaBaseUrl);
  return redirect(url.toString());
}
