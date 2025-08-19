import Link from "next/link";

export const Button = ({
  text,
  href = "#",
}: {
  text: string;
  href?: string;
}) => {
  return (
    <Link
      className="border-accent-dark bg-juvu-white font-pixel border-2 px-2 text-lg"
      href={href}
    >
      {text}
    </Link>
  );
};
