import Link from "next/link";

export const Button = ({
  text,
  href = "#",
  disabled = false,
}: {
  text: string;
  href?: string;
  disabled?: boolean;
}) => {
  return (
    <Link
      className={`border-accent-dark bg-juvu-white font-pixel border-2 px-2 text-lg ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
      href={href}
    >
      {text}
    </Link>
  );
};
