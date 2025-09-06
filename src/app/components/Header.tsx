import { Redaction } from "./Redaction";

export default function Header({
  text,
  size,
  className,
  animated = false,
}: {
  text: string;
  size?: "small" | "medium" | "large";
  className?: string;
  animated?: boolean;
}) {
  return (
    <div
      className={`${className} bg-accent-light text-header relative flex items-end justify-center`}
    >
      <Redaction text={text} size={size ?? "large"} animated={animated} />
    </div>
  );
}
