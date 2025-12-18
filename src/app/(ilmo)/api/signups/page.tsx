import { redirect } from "next/navigation";

export default async function Page() {
  return redirect("https://ilmo.tietokilta.fi/api/signups");
}
