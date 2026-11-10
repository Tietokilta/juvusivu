"use client";
import dynamic from "next/dynamic";

const DvdScreensaver = dynamic(
  () => import("react-dvd-screensaver").then((mod) => mod.DvdScreensaver),
  {
    ssr: false,
  },
);

export const BouncyLogo = () => {
  return (
    <div className="h-48">
      <DvdScreensaver speed={1}>
        <span className="text-leaf-dark inline-block text-center font-mono leading-tight font-bold">
          Muistinnollaus
          <br />
          101001
        </span>
      </DvdScreensaver>
    </div>
  );
};
