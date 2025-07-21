import { getI18n } from "@locales/server";
import Link from "next/link";

export default async function Navbar() {
  const t = await getI18n();
  return (
    <nav className="fixed top-0 z-10 flex w-1/1 items-center justify-between bg-gray-400 font-mono">
      <Link
        href="/"
        className="bg-accent-dark w-1/2 p-4 text-lg font-bold text-white"
      >
        {t("navbar-title")}
      </Link>
      <ul className="flex w-1/2 content-between space-x-4 p-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Link
            href="/"
            key={i}
            className="flex-1 text-center font-bold text-black hover:underline"
          >
            Link
          </Link>
        ))}
      </ul>
    </nav>
  );
}
