import { Redaction } from "./Redaction";

export default function Header({
  text,
  animated = false,
}: {
  text: string;
  animated?: boolean;
}) {
  return (
    <div className="bg-accent-light text-header relative flex items-end justify-center py-20">
      <Redaction text={text} animated={animated} />
    </div>
  );
}
