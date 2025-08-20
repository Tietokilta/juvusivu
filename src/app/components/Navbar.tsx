import { getI18n } from "@locales/server";
import Link from "next/link";

export default async function Navbar() {
  const t = await getI18n();
  return (
    <nav className="bg-accent-light border-accent-dark fixed top-0 z-10 flex w-1/1 flex-wrap items-center justify-between border-b-2 font-mono">
      <Link
        href="/"
        className="bg-accent-dark min-w-[300px] flex-1 p-4 text-lg font-bold text-white"
      >
        {t("navbar-title")}
      </Link>
      <ul className="flex flex-1 content-between space-x-4 p-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Link
            href="/"
            key={i}
            className="text-header flex-1 text-center font-bold hover:underline"
          >
            Link
          </Link>
        ))}
      </ul>
    </nav>
  );
}
