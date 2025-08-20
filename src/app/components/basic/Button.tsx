import Link from "next/link";

export const Button = ({
  text,
  href = "#",
  disabled = false,
  fake = false,
}: {
  text: string;
  href?: string;
  disabled?: boolean;
  fake?: boolean;
}) => {
  if (disabled) {
    return (
      <button
        className="border-accent-dark bg-juvu-white font-pixel border-2 px-2 text-lg opacity-50"
        disabled
      >
        {text}
      </button>
    );
  }
  if (fake) {
    return (
      <div className="border-accent-dark bg-juvu-white font-pixel border-2 px-2 text-lg">
        {text}
      </div>
    );
  }
  return (
    <Link
      className={`border-accent-dark bg-juvu-white font-pixel border-2 px-2 text-lg`}
      href={href}
    >
      {text}
    </Link>
  );
};
