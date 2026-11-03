import Link from "next/link";

export const Button = ({
  type,
  text,
  href = "#",
  disabled = false,
  onClick,
}: {
  type: "submit" | "button" | "link" | "fake";
  text: string;
  href?: string;
  disabled?: boolean;

  onClick?: () => void;
}) => {
  const style =
    "border-accent-dark bg-cream-light font-mono border-2 px-2 text-lg hover:bg-cream-dark disabled:hover:bg-cream-light disabled:opacity-50";

  if (type === "fake") {
    return <div className={style}>{text}</div>;
  }
  if (type === "submit") {
    return (
      <button type="submit" className={style} disabled={disabled}>
        {text}
      </button>
    );
  }
  if (type === "button") {
    return (
      <button
        type="button"
        className={style}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    );
  }
  if (type === "link") {
    return (
      <Link className={style} href={href}>
        {text}
      </Link>
    );
  }
  return null;
};
