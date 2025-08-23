import { Redaction } from "./Redaction";

export default function Header({
  text,
  animated = false,
}: {
  text: string;
  animated?: boolean;
}) {
  return (
    <div className="bg-accent-light text-header relative flex h-[55vh] max-h-[450px] items-end justify-center py-24 md:h-[65vh]">
      <Redaction text={text} animated={animated} />
    </div>
  );
}
