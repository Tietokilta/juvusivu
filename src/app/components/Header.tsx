const sizeClasses = {
  small: "text-2xl md:text-4xl",
  medium: "text-3xl md:text-5xl",
  large: "text-[clamp(2.5rem,9vw,5rem)]",
};

export default function Header({
  text,
  size,
  className,
}: {
  text: string;
  size?: "small" | "medium" | "large";
  className?: string;
}) {
  return (
    <div
      className={`${className ?? ""} bg-vine text-ink relative flex items-end justify-center`}
    >
      <h1
        className={`${sizeClasses[size ?? "large"]} m-8 max-w-full text-center font-mono font-bold wrap-break-word hyphens-auto`}
      >
        {text}
      </h1>
    </div>
  );
}
