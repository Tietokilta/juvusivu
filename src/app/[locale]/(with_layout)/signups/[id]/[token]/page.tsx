import { EditForm } from "./EditForm";

interface PageProps {
  params: Promise<{
    id: string;
    token: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id, token } = await params;
  return <EditForm id={id} token={token} />;
}
