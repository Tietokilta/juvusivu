import { Metadata } from "next";
import { EditForm } from "@components/signup/EditForm";

interface PageProps {
  params: Promise<{
    id: string;
    token: string;
  }>;
}

export const metadata: Metadata = {
  robots: {
    index: false, // prevents indexing
    follow: false, // prevents link following
  },
};

export default async function Page({ params }: PageProps) {
  const { id, token } = await params;
  return <EditForm id={id} token={token} paid />;
}
