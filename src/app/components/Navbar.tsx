import { getCurrentLocale, getI18n } from "@locales/server";
import Link from "next/link";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { LanguageButton } from "./LanguageButton";

export default async function Navbar({
  variant,
}: {
  variant?: "m0" | "default";
}) {
  const t = await getI18n();
  const locale = await getCurrentLocale();
  const payload = await getPayload({ config: configPromise });
  const links = await payload.find({
    collection: "links",
    locale,
  });
  return (
    <nav
      className={`${variant === "m0" ? "bg-juvu-blue-dark" : "bg-accent-light border-accent-dark border-b-2"} z-10 flex w-full flex-wrap items-center justify-between font-mono`}
    >
      <Link
        href="/"
        className={`${variant === "m0" ? "font-redaction text-2xl md:pl-8" : "bg-accent-dark text-lg"} text-juvu-white min-w-[300px] flex-1 p-4 text-center font-bold sm:text-left`}
      >
        {t("navbar-title")}
      </Link>
      <ul
        className={`${variant === "m0" ? "text-juvu-white" : "text-header"} flex flex-1 content-between space-x-4 p-4`}
      >
        {links.docs.map((link) => (
          <Link
            href={`/${link.page}`}
            key={link.id}
            className="flex-1 text-center font-bold hover:underline"
          >
            {link.name}
          </Link>
        ))}
        <LanguageButton />
      </ul>
    </nav>
  );
}
