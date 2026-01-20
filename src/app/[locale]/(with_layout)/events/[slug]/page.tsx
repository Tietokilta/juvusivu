import { notFound } from "next/navigation";
import { fetchEvent } from "@lib/api/external/ilmomasiina";
import { Window } from "@components/Window";
import { Metadata } from "next";
import SignUpList from "@components/events/SignUpList";
import QuotaWindow from "@components/events/QuotaWindow";
import EventSummary from "@components/events/EventSummary";
import { SignUpCountdown } from "@components/signup/SignUpCountdown";
import { EventDescription } from "@components/events/EventDescription";

export const metadata: Metadata = {
  robots: {
    index: false, // prevents indexing
    follow: false, // prevents link following
  },
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const t = await getScopedI18n("ilmomasiina");
  const locale = await getCurrentLocale();

  const eventResponse = await fetchEvent(slug, locale);
  if (eventResponse.error) {
    notFound();
  }
  const event = eventResponse.data;
  const hasSignup = event.quotas.length > 0;

  return (
    <div className="container mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 py-8 md:grid-cols-3">
      <div className="md:col-span-3">
        <EventSummary event={event} />
      </div>
      <div
        className={`${hasSignup ? "md:col-span-2" : "md:col-span-3"} md:row-start-2`}
      >
        <EventDescription event={event} />
      </div>
      {hasSignup && (
        <div className="md:col-start-3 md:row-start-2">
          <Window title={t("Ilmoittautuminen")} className="font-pixel mb-5">
            <SignUpCountdown event={event} />
          </Window>
          <QuotaWindow event={event} />
        </div>
      )}
      {event.registrationStartDate &&
        event.registrationEndDate &&
        hasSignup && (
          <div className="md:col-span-3 md:row-start-3">
            <Window title={t("Ilmoittautuneet")}>
              <SignUpList event={event} />
            </Window>
          </div>
        )}
    </div>
  );
}
