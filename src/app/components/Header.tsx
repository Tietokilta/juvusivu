import { Redaction } from "./Redaction";

export default function Header() {
  return (
    <div className="relative flex h-[55vh] max-h-[500px] items-end justify-center bg-indigo-300 py-24 text-black md:h-[75vh]">
      <Redaction text="Tietokilta 40" />
    </div>
  );
}
