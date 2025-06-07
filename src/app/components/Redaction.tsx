import localFont from "next/font/local";

const redaction35 = localFont({
  src: "../../../public/fonts/Redaction_35-Bold.woff2",
});

export const Redaction = ({
  text,
  size,
}: {
  text: string;
  size?: "small" | "medium" | "large";
}) => {
  const sizeClass =
    size === "small" ? "text-4xl" : size === "medium" ? "text-6xl" : "text-8xl";
  return (
    <h1 className={`${redaction35.className} ${sizeClass} m-8 text-center`}>
      {text}
    </h1>
  );
};
