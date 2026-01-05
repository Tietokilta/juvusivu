"use client";
import Image from "next/image";
import { DvdScreensaver } from "react-dvd-screensaver";

export const BouncyLogo = () => {
  return (
    <div className="h-48">
      <DvdScreensaver speed={1}>
        <Image
          src={"/m0_logo_darker.svg"}
          alt="Muistinnollaus 101000"
          width={200}
          height={50}
        />
      </DvdScreensaver>
    </div>
  );
};
