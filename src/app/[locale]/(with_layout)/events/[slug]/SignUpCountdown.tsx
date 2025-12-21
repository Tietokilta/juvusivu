"use client";
import { UserEventResponse } from "@tietokilta/ilmomasiina-models";
import Countdown from "react-countdown";
import { SignUp } from "./SignUp";
import { dateFormatter } from "@util/index";
import { useCurrentLocale, useScopedI18n } from "@locales/client";

export const SignUpCountdown = ({ event }: { event: UserEventResponse }) => {
  const openingTime = new Date(event.registrationStartDate || Date.now());
  return (
    <Countdown
      date={openingTime}
      daysInHours
      renderer={({ completed, seconds, total }) => (
        <SignUpButtons
          event={event}
          seconds={seconds}
          total={total}
          isOpen={completed && !event.registrationClosed}
          isClosed={event.registrationClosed}
        />
      )}
    />
  );
};

const SignUpButtons = ({
  event,
  seconds,
  total,
  isOpen,
  isClosed,
}: {
  event: UserEventResponse;
  seconds: number;
  total: number;
  isOpen: boolean;
  isClosed: boolean;
}) => {
  return (
    <div>
      <div className="mb-2">
        <SignupStatusText
          event={event}
          seconds={seconds}
          total={total}
          isOpen={isOpen}
          isClosed={isClosed}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        {event.quotas.map((quota) => (
          <SignUp key={quota.id} quota={quota} disabled={!isOpen} />
        ))}
      </div>
    </div>
  );
};

const SignupStatusText = ({
  event,
  seconds,
  total,
  isOpen,
  isClosed,
}: {
  event: UserEventResponse;
  seconds: number;
  total: number;
  isOpen: boolean;
  isClosed: boolean;
}) => {
  const locale = useCurrentLocale();
  const t = useScopedI18n("ilmo.status");
  if (isOpen) {
    // Open
    if (!event.registrationEndDate) {
      return <span>{t("open")}</span>;
    } else {
      return (
        <span>{`${t("open-until")} ${dateFormatter(event.registrationEndDate, locale)}`}</span>
      );
    }
  } else if (!isOpen && !isClosed && event.registrationStartDate) {
    // Upcoming
    const counter =
      total < 60 * 1000 ? (
        <span className="text-green-600">{` (${seconds} s)`}</span>
      ) : null;
    return (
      <>
        <span>{`${t("opens-at")} ${dateFormatter(event.registrationStartDate, locale)}`}</span>
        {counter}
      </>
    );
  } else {
    // Closed
    if (event.registrationEndDate) {
      return (
        <span>{`${t("closed-at")} ${dateFormatter(event.registrationEndDate, locale)}`}</span>
      );
    } else {
      return <span>{t("closed")}</span>;
    }
  }
};
