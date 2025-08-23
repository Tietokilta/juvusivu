"use client";
import localFont from "next/font/local";
import { useCallback, useState } from "react";

const redaction70 = localFont({
  src: "../../../public/fonts/redaction/Redaction_70-Bold.woff2",
});

const redaction50 = localFont({
  src: "../../../public/fonts/redaction/Redaction_50-Bold.woff2",
});

const redaction35 = localFont({
  src: "../../../public/fonts/redaction/Redaction_35-Bold.woff2",
});

const redaction20 = localFont({
  src: "../../../public/fonts/redaction/Redaction_20-Bold.woff2",
});

const redaction10 = localFont({
  src: "../../../public/fonts/redaction/Redaction_10-Bold.woff2",
});

export const Redaction = ({
  text,
  size,
  animated = false,
}: {
  text: string;
  size?: "small" | "medium" | "large";
  animated?: boolean;
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const handleMouseEnter = useCallback((index: number) => {
    setHoverIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoverIndex(null);
  }, []);

  const sizeClass =
    size === "small"
      ? "md:text-4xl text-3xl"
      : size === "medium"
        ? "md:text-6xl text-5xl"
        : "text-[clamp(3rem,13vw,6rem)]";
  return (
    <h1 className={`${sizeClass} ${redaction35.className} m-8 text-center`}>
      {animated ? (
        text.split("").map((char, index) => {
          if (char === " ") {
            return <span key={index} className="inline-block w-[0.3em]" />;
          }
          const distance =
            hoverIndex !== null ? Math.abs(hoverIndex - index) : Infinity;

          let font = "";
          if (distance === 0) {
            font = redaction70.className;
          } else if (distance === 1) {
            font = redaction50.className;
          } else if (distance === 2) {
            font = redaction35.className;
          } else if (distance === 3) {
            font = redaction20.className;
          } else {
            font = redaction10.className;
          }

          return (
            <span
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              className={`${font}`}
            >
              {char}
            </span>
          );
        })
      ) : (
        <>{text}</>
      )}
    </h1>
  );
};
