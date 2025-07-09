import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-gray-400 font-mono">
      <div className="w-1/2 bg-indigo-700 p-4 text-lg font-bold text-white">
        Tietokilta 40 vuotta
      </div>
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
