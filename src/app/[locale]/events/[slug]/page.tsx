import { getPayload } from "payload";
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
import { Window } from "@components/Window";
import { ProgressBar } from "@components/basic/ProgressBar";
import { getScopedI18n } from "@locales/server";
import { Button } from "@components/basic/Button";

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
      <td className="border-b border-gray-900 px-2 py-1">
        <span>{signup.position}.</span>
      </td>
      <td className="border-b border-gray-900 px-2 py-1">
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
        <td key={question.id} className="border-b border-gray-900 px-2 py-1">
          {getFormattedAnswer(question, signup.answers)}
        </td>
      ))}
      {isGeneratedQuota ? (
        <td className="border-b border-gray-900 px-2 py-1">
          {"quotaTitle" in signup ? signup.quotaTitle : ""}
        </td>
      ) : null}
      <td className="border-b border-gray-900 px-2 py-1">
        {new Date(signup.createdAt).toLocaleString("fi-FI")}
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
  const isGeneratedQuota = !!isOpenQuota || !!isQueueQuota;

  return (
    <div className="shadow-solid border-accent-dark block w-full overflow-x-auto border-2">
      <table className="w-full table-auto border-separate border-spacing-0">
        <thead>
          <tr className="bg-row-even">
            <th className="rounded-tl-md border-b border-gray-900 p-2">
              {t("headers.Sija")}
            </th>
            <th className="border-b border-gray-900 p-2">
              {t("headers.Nimi")}
            </th>
            {publicQuestions.map((question) => (
              <th key={question.id} className="border-b border-gray-900 p-2">
                {question.question}
              </th>
            ))}
            {isGeneratedQuota ? (
              <th className="border-b border-gray-900 p-2">
                {t("headers.Kiintiö")}
              </th>
            ) : null}
            <th className="rounded-tr-md border-b border-gray-900 p-2">
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
      <ul className="space-y-16">
        {quotasWithOpenAndQueue.map((quota) => (
          <li key={quota.id} className="space-y-2">
            <h3 className="font-pixel text-lg font-semibold text-gray-900">
              {quota.title}
            </h3>
            <SignUpTable
              signupsPublic={event.signupsPublic}
              publicQuestions={publicQuestions}
              quota={quota}
            />
          </li>
        ))}
      </ul>
    </div>
  );
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

  if (event_cms.docs.length === 0) {
    notFound();
  }
  const event = await fetchEvent(slug);
  return (
    <div className="container mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 py-8 md:grid-cols-3">
      <div className="md:col-span-3">
        <Window title={event.title}>
          {event.location && (
            <p>
              <span className="font-bold">{t("headers.Paikka")}:</span>{" "}
              {event.location}
            </p>
          )}
          {event.date && (
            <p>
              <span className="font-bold">{t("headers.Alkaa")}:</span>{" "}
              {new Date(event.date).toLocaleString("fi-FI")}
            </p>
          )}
          {event.endDate && (
            <p>
              <span className="font-bold">{t("headers.Loppuu")}:</span>{" "}
              {new Date(event.endDate).toLocaleString("fi-FI")}
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
          <Markdown>{event.description}</Markdown>
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
                {quota.title} ({quota.signupCount ?? 0}/{quota.size ?? 0})
              </p>
              <ProgressBar
                max={quota.size ?? 0}
                value={quota.signupCount ?? 0}
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
