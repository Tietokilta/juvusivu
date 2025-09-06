import { getPayload, Locale } from "payload";
import configPromise from "@payload-config";
import Markdown from "react-markdown";
import { notFound } from "next/navigation";
import {
  EventQuestion,
  EventQuota,
  EventQuotaWithSignups,
  fetchEvent,
  getQuotasWithOpenAndQueue,
  IlmomasiinaEvent,
  OPEN_QUOTA_ID,
  QuestionAnswer,
  QUEUE_QUOTA_ID,
  QuotaSignup,
  QuotaSignupWithQuotaTitle,
} from "@lib/api/external/ilmomasiina";
import { remarkI18n } from "@lib/plugins/remark-i18n";

import { Window } from "@components/Window";
import { ProgressBar } from "@components/basic/ProgressBar";
import { getCurrentLocale, getScopedI18n } from "@locales/server";
import { Button } from "@components/basic/Button";
import remarkGfm from "remark-gfm";

function getFormattedAnswer(
  question: EventQuestion,
  answers: QuestionAnswer[],
) {
  const answer = answers.find((a) => a.questionId === question.id)?.answer;

  if (!answer) {
    return "";
  }

  if (Array.isArray(answer)) {
    return answer.join(", ");
  }

  return answer;
}

async function SignUpRow({
  signup,
  publicQuestions,
  isGeneratedQuota,
}: {
  signup: QuotaSignup | QuotaSignupWithQuotaTitle;
  publicQuestions: EventQuestion[];
  isGeneratedQuota: boolean;
}) {
  const t = await getScopedI18n("ilmomasiina");
  return (
    <tr className="odd:bg-row-odd even:bg-row-even">
      <td className="font-pixel border-b border-gray-900 px-2 py-1 text-base">
        <span>{signup.position}.</span>
      </td>
      <td className="font-pixel border-b border-gray-900 px-2 py-1 text-base">
        {signup.namePublic ? (
          <span>
            {signup.firstName} {signup.lastName}
          </span>
        ) : (
          <span className="italic">
            {signup.confirmed ? t("Piilotettu") : t("Vahvistamaton")}
          </span>
        )}
      </td>
      {publicQuestions.map((question) => (
        <td
          key={question.id}
          className="font-pixel border-b border-gray-900 px-2 py-1 text-base"
        >
          {getFormattedAnswer(question, signup.answers)}
        </td>
      ))}
      {isGeneratedQuota ? (
        <td className="font-pixel border-b border-gray-900 px-2 py-1 text-base">
          {"quotaTitle" in signup ? signup.quotaTitle : ""}
        </td>
      ) : null}
      <td className="font-pixel border-b border-gray-900 px-2 py-1 text-base">
        {new Date(signup.createdAt).toLocaleString("fi-FI", {
          timeZone: "Europe/Helsinki",
        })}
      </td>
    </tr>
  );
}

async function SignUpTable({
  quota,
  publicQuestions,
  signupsPublic,
}: {
  quota: EventQuota | EventQuotaWithSignups;
  publicQuestions: EventQuestion[];
  signupsPublic?: boolean;
}) {
  const t = await getScopedI18n("ilmomasiina");

  if (!signupsPublic) {
    return <p>{t("status.Ilmoittautumistiedot eivät ole julkisia")}</p>;
  }

  const signups = quota.signups ?? [];
  if (signups.length === 0) {
    return <p>{t("status.Ei ilmoittautuneita vielä")}</p>;
  }

  const isOpenQuota = quota.id === OPEN_QUOTA_ID;
  const isQueueQuota = quota.id === QUEUE_QUOTA_ID;
  const isGeneratedQuota = isOpenQuota || isQueueQuota;

  return (
    <div className="shadow-solid border-accent-dark block w-full overflow-x-auto border-2">
      <table className="w-full table-auto border-separate border-spacing-0">
        <thead>
          <tr className="bg-row-even">
            <th className="font-pixel rounded-tl-md border-b border-gray-900 p-2 text-lg">
              {t("headers.Sija")}
            </th>
            <th className="font-pixel border-b border-gray-900 p-2 text-lg">
              {t("headers.Nimi")}
            </th>
            {publicQuestions.map((question) => (
              <th
                key={question.id}
                className="font-pixel border-b border-gray-900 p-2 text-lg"
              >
                {question.question}
              </th>
            ))}
            {isGeneratedQuota ? (
              <th className="font-pixel border-b border-gray-900 p-2 text-lg">
                {t("headers.Kiintiö")}
              </th>
            ) : null}
            <th className="font-pixel rounded-tr-md border-b border-gray-900 p-2 text-lg">
              {t("headers.Ilmoittautumisaika")}
            </th>
          </tr>
        </thead>
        <tbody>
          {signups
            .filter(
              (signup) => isGeneratedQuota || signup.status === "in-quota",
            )
            .toSorted((a, b) => a.position - b.position)
            .map((signup) => (
              <SignUpRow
                key={signup.position}
                signup={signup}
                publicQuestions={publicQuestions}
                isGeneratedQuota={isGeneratedQuota}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}

async function SignUpList({ event }: { event: IlmomasiinaEvent }) {
  if (!event.registrationStartDate || !event.registrationEndDate) {
    return null;
  }

  const quotasWithOpenAndQueue = getQuotasWithOpenAndQueue(
    event.quotas,
    event.openQuotaSize,
  );

  const publicQuestions = event.questions.filter((question) => question.public);

  return (
    <div className="space-y-4">
      <ul className="space-y-4">
        {quotasWithOpenAndQueue.map((quota) => (
          <li key={quota.id} className="space-y-2">
            <Window
              title={quota.title}
              windowPath={`tietokilta.fi/fi/tapahtumat/ilmoittautuneet?kiintiö=${quota.signupCount}/${quota.size}`}
              className="mx-4"
            >
              <SignUpTable
                signupsPublic={event.signupsPublic}
                publicQuestions={publicQuestions}
                quota={quota}
              />
            </Window>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function getLocalizedEventTitle(eventTitle: string, locale: "fi" | "en") {
  const titleLocaleSeparator = " // ";
  const [fiTitle, enTitle] = eventTitle.split(titleLocaleSeparator);
  console.log(enTitle);
  console.log(fiTitle);
  console.log(locale)

  if (locale === "en") {
    return enTitle || fiTitle;
  }

  return fiTitle;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const payload = await getPayload({ config: configPromise });
  const event_cms = await payload.find({
    collection: "events",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  });
  const t = await getScopedI18n("ilmomasiina");
  const locale = await getCurrentLocale();

  if (event_cms.docs.length === 0) {
    notFound();
  }
  const event = await fetchEvent(slug);
  return (
    <div className="container mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 py-8 md:grid-cols-3">
      <div className="md:col-span-3">
        <Window title={getLocalizedEventTitle(event.title, locale)}>
          {event.location && (
            <p>
              <span className="font-bold">{t("headers.Paikka")}:</span>{" "}
              {event.location}
            </p>
          )}
          {event.date && (
            <p>
              <span className="font-bold">{t("headers.Alkaa")}:</span>{" "}
              {new Date(event.date).toLocaleString("fi-FI", {
                timeZone: "Europe/Helsinki",
              })}
            </p>
          )}
          {event.endDate && (
            <p>
              <span className="font-bold">{t("headers.Loppuu")}:</span>{" "}
              {new Date(event.endDate).toLocaleString("fi-FI", {
                timeZone: "Europe/Helsinki",
              })}
            </p>
          )}
          {event.price && (
            <p>
              <span className="font-bold">{t("headers.Hinta")}:</span>{" "}
              {event.price}
            </p>
          )}
        </Window>
      </div>
      <div className="md:col-span-2 md:row-start-2">
        <Window title={t("description")}>
            {event.description ? (
              <div className="prose text-accent-dark">
                <Markdown
                  remarkPlugins={[[remarkI18n, { locale }], remarkGfm]}
                >
                  {event.description}
                </Markdown>
              </div>
            ) : null}
        </Window>
      </div>
      <div className="md:col-start-3 md:row-start-2">
        <Window title={t("Ilmoittautuminen")} className="font-pixel mb-5">
          <div className="flex items-center justify-center">
            <Button
              text={t("signup")}
              href={`https://ilmo.tietokilta.fi/events/${slug}`}
              disabled={event.registrationClosed ?? true}
            />
          </div>
        </Window>
        <Window title={t("quotas")} className="font-pixel">
          {event.quotas.map((quota) => (
            <div key={quota.id} className="mb-4">
              <p>
                {quota.title}{" "}
                {quota.size
                  ? `(${quota.signupCount ?? 0}/${quota.size ?? 0})`
                  : `(${quota.signupCount ?? 0})`}
              </p>
              <ProgressBar
                max={quota.size ?? 1}
                value={
                  quota.size ? Math.min(quota.signupCount ?? 0, quota.size) : 0
                }
              />
            </div>
          ))}
        </Window>
      </div>
      {event.registrationStartDate && event.registrationEndDate && (
        <div className="md:col-span-3 md:row-start-3">
          <Window title={t("Ilmoittautuneet")}>
            <SignUpList event={event} />
          </Window>
        </div>
      )}
    </div>
  );
}
