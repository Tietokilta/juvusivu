import { Redaction } from "./Redaction";

export default function Header() {
  return (
    <div className="bg-accent-light text-header relative flex h-[55vh] max-h-[500px] items-end justify-center py-24 md:h-[75vh]">
      <Redaction text="Tietokilta 40" />
    </div>
  );
}
