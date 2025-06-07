"use client";
import dynamic from "next/dynamic";
import React from "react";

type TimeType = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
};

interface CountDownProps {
  date: Date | string;
  locale?: string;
}

const CountDown = ({ date, locale }: CountDownProps) => {
  const Countdown = dynamic(() => import("react-countdown"), {
    ssr: false,
  });

  const localisedText =
    locale?.toLowerCase() === "fi"
      ? {
          days: "päivää",
          hours: "tuntia",
          minutes: "minuuttia",
          seconds: "sekuntia",
        }
      : {
          days: "days",
          hours: "hours",
          minutes: "minutes",
          seconds: "seconds",
        };

  const renderer = ({ days, hours, minutes, seconds, completed }: TimeType) => {
    if (completed) {
      // Render a completed state
      return <></>;
    } else {
      // Render a countdown
      const headerName = "text-5xl m-1 text-center";
      const textName = "text-lg m-1 text-center";
      return (
        <div className="grid w-full grid-cols-4 justify-center gap-x-3 gap-y-1 p-5">
          {/* Top row: numbers */}
          <h1 className={headerName}>{days}</h1>
          <h1 className={headerName}>{hours}</h1>
          <h1 className={headerName}>{minutes}</h1>
          <h1 className={headerName}>{seconds}</h1>
          {/* Bottom row: labels */}
          <p className={textName}>{localisedText.days.toUpperCase()}</p>
          <p className={textName}>{localisedText.hours.toUpperCase()}</p>
          <p className={textName}>{localisedText.minutes.toUpperCase()}</p>
          <p className={textName}>{localisedText.seconds.toUpperCase()}</p>
        </div>
      );
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Countdown date={new Date(date)} renderer={renderer} />
    </div>
  );
};

export default CountDown;
