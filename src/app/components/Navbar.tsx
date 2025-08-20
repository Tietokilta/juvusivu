import { getCurrentLocale, getI18n } from "@locales/server";
import Link from "next/link";
import { getPayload } from "payload";
import configPromise from "@payload-config";

export default async function Navbar() {
  const t = await getI18n();
  const locale = await getCurrentLocale();
  const payload = await getPayload({ config: configPromise });
  const links = await payload.find({
    collection: "links",
    locale,
  });
  return (
    <nav className="bg-accent-light border-accent-dark fixed top-0 z-10 flex w-1/1 flex-wrap items-center justify-between border-b-2 font-mono">
      <Link
        href="/"
        className="bg-accent-dark min-w-[300px] flex-1 p-4 text-lg font-bold text-white"
      >
        {t("navbar-title")}
      </Link>
      <ul className="flex flex-1 content-between space-x-4 p-4">
        {links.docs.map((link) => (
          <Link
            href={link.page}
            key={link.id}
            className="text-header flex-1 text-center font-bold hover:underline"
          >
            {link.name}
          </Link>
        ))}
      </ul>
    </nav>
  );
}
